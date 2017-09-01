<template>
  <div class="find">
    <!--<mt-header fixed title="find"></mt-header>-->
    <scroller style="padding-top: 40px">
      <div class="find-cell" v-for="item in category" @click="toCategory(item.name)">
        <div class="item">
          <div class="icon-box">
            <i class="icon iconfont icon-anzhuo1" :class="item.icon"></i>
          </div>
          <div class="text">{{item.name}}</div>
          <div class="more">
            <i class="icon iconfont icon-enter"></i>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
  export default {
    name: 'find',
    data () {
      return {
        category: [
          {
            name: 'Android',
            icon: 'icon-anzhuo1'
          },
          {
            name: 'iOS',
            icon: 'icon-iOS-'
          },
          {
            name: '前端',
            icon: 'icon-qianduanjishu'
          },
          {
            name: '拓展资源',
            icon: 'icon-manage_fill'
          },
          {
            name: '瞎推荐',
            icon: 'icon-praise_fill'
          },
          {
            name: 'App',
            icon: 'icon-APP'
          },
          {
            name: '休息视频',
            icon: 'icon-live_fill'
          }
        ]
      }
    },
    methods: {
      toCategory (name) {
        this.$router.push({name: 'Category', params: {name: name}})
      }
    }
  }
</script>
<style lang="less">
  .find-cell {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #fefefe;
    margin-bottom: 1px;
    .item {
      width: 100%;
      display: flex;
      font-size: 16px;
      .icon-box {
        width: 40px;
        text-align: center;
        line-height: 40px;
        .icon {
          height: 40px;
          font-size: 18px;
          vertical-align: top;
          color: #ff4949
        }
      }
      .more {
        width: 40px;
        height: 100%;
        color: #ddd;
        text-align: right;
        padding-right: 10px;
      }

      .text {
        flex: 1;
        color: #333;
      }
    }

  }
</style>

