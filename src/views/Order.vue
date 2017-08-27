<template>
  <div class="order">
    <!--<mt-header fixed title="order"></mt-header>-->
    <scroller style="padding-top: 40px"
              :on-refresh="onRefresh"
              :on-infinite="onInfinite"
              ref="my_scroller" class="my-scroller"
              refresh-layer-color="#4b8bf4"
              loading-layer-color="#ec4949">
      <refresh slot="refresh-spinner"></refresh>
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
              <span class="item"><i class="icon iconfont icon-praise"></i>{{item.like}}</span>
              <span class="item"><i class="icon iconfont icon-message"></i>{{item.comment}}</span>
              <span class="item"><i class="icon iconfont icon-share"></i>{{item.share}}</span>
            </div>
          </div>
        </div>
      </div>
      <infinite slot="infinite-spinner"></infinite>
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
          this.dataList.map(item => {
            let like = item.like = Math.ceil(Math.random() * 1000)
            let comment = item.comment = Math.ceil(Math.random() * 1000)
            let share = item.share = Math.ceil(Math.random() * 1000)
            return {like, comment, share}
          })
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
      console.log('怎么会呢？')
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

