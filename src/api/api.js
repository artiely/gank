import fetch from './fetch'
// 福利
const WEAL = params => {
  return fetch({
    url: `/api/data/福利/10/${params.page}`,
    method: 'get',
    params: ''
  })
}
// 各个类别
const ALL = params => {
  return fetch({
    url: `/api/data/${params.category}/10/${params.page}?imageView2/0/w/100`,
    method: 'get',
    params: ''
  })
}
const apiList = {
  WEAL,
  ALL
}

export default apiList
