<template>
  <div class="index">
    <!--<mt-header fixed title="首页"></mt-header>-->
    <keep-alive>
      <scroller style="padding-top: 40px"
                :on-refresh="onRefresh"
                :on-infinite="onInfinite"
                ref="my_scroller" class="my-scroller"
                refresh-layer-color="#4b8bf4"
                loading-layer-color="#ec4949">
        <refresh slot="refresh-spinner"></refresh>
        <ul>
          <li v-for="(item,i) in dateList" :key="i" class="imgbox">
            <img v-lazy="item.url">
            <div class="clearfix desc">
            <span class="pull-right">
              <span class="like-num"><span v-if="item.like" class="add-num">+1</span>{{item.likeNum}}</span>
              <i class="icon iconfont icon-like_fill heart" v-if="item.like" @click="like(item,i)"></i>
            <i class="icon iconfont icon-like" v-if="!item.like" @click="like(item,i)"></i>
            </span>
              <span class="time-ago pull-left">{{item.createdAt | timeAgo}}</span>
            </div>
          </li>
        </ul>
        <infinite slot="infinite-spinner"></infinite>
      </scroller>
    </keep-alive>
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
    beforeRouteLeave (to, from, next) {
      this.$refs.my_scroller.finishInfinite(true)
      console.log('我走了')
      next()
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
        console.log('我就这么执行了')
        this.page++
        this.getData(() => done(true))
      }
    },
    created () {
      this.getData()
    },
    destroyed () {
      console.log('index destroyed')
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
      top: -20px;
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
      .add-num {
        position: relative;
        top: 10px;
        color: #ff4949;
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

