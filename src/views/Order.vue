<template>
  <div class="order">
    <!--<mt-header fixed title="order"></mt-header>-->
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
      <div class="mast-cell" v-for="item in dataList">
        <div class="img-box">
          <a :href="item.url" target="_blank">
            <img :src="item.images?item.images[0]:require('@/assets/img/icon.jpg')" alt="" class="des-img">
          </a>
        </div>
        <div class="text-box">
          <div>
            <span class="who"> <span v-if="item.who">{{item.who}}</span><span v-else>佚名</span></span>
            <p class="time"> {{item.publishedAt | timeAgo}}</p>
          </div>
          <div>
            <div class="textover2 des">
              <a :href="item.url" target="_blank">{{item.desc}}</a>
            </div>
            <div class="tool">
              <span class="item"><i class="icon iconfont icon-praise"></i>123</span>
              <span class="item"><i class="icon iconfont icon-message"></i>312</span>
              <span class="item"><i class="icon iconfont icon-share"></i>22</span>
            </div>
          </div>
        </div>
      </div>
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
    name: 'order',
    data () {
      return {
        dataList: [],
        page: 1,
        category: 'all'
      }
    },
    methods: {
      getData (cb) {
        this.$api.ALL({category: this.category, page: this.page}).then(res => {
          if (this.page === 1) {
            this.dataList = res
          } else {
            this.dataList = this.dataList.concat(res)
          }
          if (cb && typeof cb === 'function') {
            cb()
          }
        })
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
  .mast-cell {
    position: relative;
    background: #fff;
    padding: 6px;
    display: flex;
    margin-bottom: 1px;
    .img-box {
      width: 100px;
      box-sizing: border-box;
    }
    .text-box {
      position: relative;
      padding-left: 10px;
      flex: 1;
      .who {
        font-size: 12px;
        color: #777;
      }
      .time {
        font-size: 10px;
        color: #ddd;
      }
      .des {
        a {
          text-decoration: none;
          color: #555;
        }
        font-size: 14px;
        color: #555;
      }
      .tool {
        position: absolute;
        width: 100%;
        left: 10px;
        bottom: 4px;
        display: flex;
        font-size: 12px;
        color: #999;
        .icon {
          font-size: 20px;
        }
        .item {
          flex: 1;
        }
      }
    }
    .des-img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
</style>

