<template>
  <div class="index">
    <!--<mt-header fixed title="首页"></mt-header>-->
    <scroller style="padding-top: 40px"
              :on-refresh="onRefresh"
              :on-infinite="onInfinite"
              ref="my_scroller" class="my-scroller"
              refresh-layer-color="#4b8bf4"
              loading-layer-color="#ec4949">
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round">
          <line x1="10" x2="10" y1="27.3836" y2="36.4931">
            <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="24" x2="24" y1="18.6164" y2="45.3836">
            <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="38" x2="38" y1="16.1233" y2="47.8767">
            <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="52" x2="52" y1="16" y2="48">
            <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                     repeatCount="indefinite"></animate>
          </line>
        </g>
      </svg>
      <ul>
        <li v-for="(item,i) in dateList" :key="i" class="imgbox">
          <img v-lazy="item.url">
          <div class="clearfix desc">
            <span class="pull-right">
              <span class="like-num"><span v-if="item.like" class="add-num">+1</span>{{item.likeNum}}</span>
              <i class="icon iconfont icon-like_fill heart" v-if="item.like" @click="like(item,i)"></i>
            <i class="icon iconfont icon-like" v-if="!item.like" @click="like(item,i)"></i>
            </span>
            <span class="time-ago pull-left">{{item.publishedAt | timeAgo}}</span>
          </div>
        </li>
      </ul>
      <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g>
          <circle cx="16" cy="32" stroke-width="0" r="3">
            <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5"
                     repeatCount="indefinite"></animate>
            <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="32" cy="32" stroke-width="0" r="3.09351">
            <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5"
                     repeatCount="indefinite"></animate>
            <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="48" cy="32" stroke-width="0" r="4.09351">
            <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6"
                     repeatCount="indefinite"></animate>
            <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
    </scroller>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {
        money: 12222.256,
        dateList: [],
        page: 1
      }
    },
    methods: {
      getData (cb) {
        this.$api.WEAL({page: this.page}).then(res => {
          if (this.page === 1) {
            this.dateList = res
          } else {
            this.dateList = this.dateList.concat(res)
          }
          if (cb && typeof cb === 'function') {
            cb()
          }
          this.dateList.map(item => {
            let like = item.like = false
            let ra = item.likeNum = Math.ceil(Math.random() * 1000)
            return {like, ra}
          })
        })
      },
      like (item, i) {
        item.like = !item.like
        if (item.like) {
          item.likeNum++
        } else {
          item.likeNum--
        }
        this.$set(this.dateList, i, item)
      },
      onRefresh (done) {
        this.page = 1
        this.getData(() => done(true))
      },
      onInfinite (done) {
        this.page++
        this.getData(() => done(true))
      }
    },
    created () {
      this.getData()
    }
  }
</script>
<style lang="less">
  .heart {
    color: #ff4949;
    animation-name: pound;
    animation-duration: .5s;
    animation-iteration-count: 1;
  }

  @keyframes pound {
    20% {
      font-size: 20px;

    }
    50% {
      font-size: 26px;
    }
    100% {

      font-size: 24px;
    }
  }
  @keyframes add {
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      top:-20px;
      opacity: 0;
    }
  }

  .desc {
    position: relative;
    height: 28px;
    line-height: 28px;
    .iconfont {
      font-size: 24px;
    }
    .like-num {
      font-size: 10px;
      .add-num{
        position: relative;
        top:10px;
        color:#ff4949;
        opacity: 0;
        animation-name: add;
        animation-duration: 1s;
        animation-iteration-count: 1;
      }
    }
  }

  .time-ago {
    font-size: 9px;
    color: #999;
  }

  .index {
    background: #f8ffff;
  }

  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }

  .imgbox {
    padding: 10px;
    margin: 10px auto;
    background: #fff;
    position: relative;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  img {
    width: 100%;
  }
</style>

