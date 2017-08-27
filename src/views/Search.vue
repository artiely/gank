<template>
  <div class="search">
    <!--<mt-header fixed title="search"></mt-header>-->
    <div class="search-box">
      <div class="search-back" @click="back">
        <i class="icon iconfont icon-return"></i>
      </div>
      <div class="search-input">
        <input type="search" class="input" placeholder="搜不到" v-model="keywords">
        <div class="clear" v-if="keywords.length>0" @click="keywords=''">
          <i class="icon iconfont icon-close"></i>
        </div>
      </div>
    </div>
    <scroller style="padding-top: 40px;background:#fafafa;">
      <div class="category-cell">按类别搜索<i class="iconfont icon-enter"></i></div>
      <div class="hot">
        <div class="title clearfix"><span class="pull-left">热门搜索</span>  <span class="pull-right" style="padding-right: 8px"> 换一批<i
          class="icon iconfont icon-refresh"></i></span></div>
        <span class="item">安卓</span><span class="item">大数据</span>
      </div>
      <div class="history ">
        <div class="title clearfix"><span class="pull-left">历史搜索</span> <span class="pull-right" style="padding-right: 8px">删除所有 <i
          class="icon iconfont icon-empty"></i></span></div>
        <div class="history-cell">
          <div class="text"> 机器学习</div>
          <div class="clear">
            <i class="icon iconfont icon-close"></i>
          </div>
        </div>
        <div class="history-cell">
          <div class="text"> iOS 入门</div>
          <div class="clear">
            <i class="icon iconfont icon-close"></i>
          </div>
        </div>
      </div>
    </scroller>
  </div>

</template>

<script>
  export default {
    name: 'search',
    data () {
      return {
        keywords: ''
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>
<style lang="less">
  .search {
    .search-box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      height: 40px;
      display: flex;
      background: #ff4949;
      .search-back, .clear {
        width: 40px;
        height: 100%;
        text-align: center;
        .icon {
          font-size: 24px;
          line-height: 40px;
          text-align: center;
          color: #fff;
        }
      }
      .search-input {
        flex: 1;
        display: flex;
        .input {
          text-indent: 4px;
          flex: 1;
          height: 100%;
          width: 100%;
          color: rgba(255, 255, 255, .8);
          background: transparent;
          font-size: 16px;
          outline: none;
          border: none;
          -webkit-appearance: none;
          &::-webkit-input-placeholder {
            color: rgba(255, 255, 255, .5);
          }
        }
        input::-webkit-search-decoration,
        input::-webkit-search-cancel-button {
          display: none;
        }
        .clear {
          width: 40px;
          height: 40px;
        }
      }
    }
    .category-cell {
      text-align: center;
      font-size: 14px;
      color: #666;
      padding: 8px;
      background: #fff;
      .iconfont {
        color: #999;
        font-size: 14px;
      }
    }
    .hot {
      padding: 8px;
      .title {
        font-size: 12px;
        padding-bottom: 10px;
        color: #666;
      }
      .item {
        color: #777;
        padding: 4px 8px;
        background: #eee;
        font-size: 13px;
        border-radius: 12px;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
    .history {
      padding-top: 10px;
      .title {
        padding: 8px;
        padding-bottom: 10px;
        font-size: 12px;
        color: #666;
      }
      .history-cell {
        padding: 8px;
        display: flex;
        background: #fefefe;
        font-size: 14px;
        color: #666;
        .text {
          flex: 1;
        }
        .clear {
          width: 35px;
          height: 100%;
          line-height: 1;
          text-align: center;
          color: #ddd;
        }
      }
    }
  }
</style>

