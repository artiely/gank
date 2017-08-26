import moment from 'moment'
/* 格式货币 */
const digitsRE = /(\d{3})(?=\d)/g

export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  let times = moment(time).format('X')
  const between = Date.now() / 1000 - Number(times)
  if (between < 3600) {
    return pluralize(~~(between / 60), '分钟前')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), '小时前')
  } else {
    return pluralize(~~(between / 86400), '天前')
  }
}

function pluralize (time, label) {
  return time + label
}
