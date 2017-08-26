<template>
  <div class="home">
    <mt-header fixed title="传国玉玺" class="main-head">
      <mt-button slot="left" @click.native="setVisible=true">
        <i class="icon iconfont icon-xuanxiang"></i>
      </mt-button>
      <mt-button slot="right">
        <i class="icon iconfont icon-search"></i>
      </mt-button>
    </mt-header>
    <transition :name="transitionName" appear>
      <keep-alive>
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
    <mt-tabbar v-model="selected" fixed class="nav-menu">
      <mt-tab-item id="1">
        <i class="iconfont " :class="selected =='1'?'icon-live_fill':'icon-live'" slot="icon"></i>
        福利
      </mt-tab-item>
      <mt-tab-item id="2">
        <i class="iconfont" :class="selected =='2'?'icon-label_fill':'icon-label'" slot="icon"></i>
        充电
      </mt-tab-item>
      <mt-tab-item id="3">
        <i class="iconfont" :class="selected =='3'?'icon-like_fill':'icon-like'" slot="icon"></i>
        发现
      </mt-tab-item>
      <mt-tab-item id="4">
        <i class="iconfont" :class="selected =='4'?'icon-collection_fill':'icon-collection'"
           slot="icon"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>

    <mt-popup
      v-model="setVisible"
      position="left"
      style="width: 80%;height: 100%;">
      <scroller style="background:#fafafa;">

        <div class="top-user">
          <div class="user-icon">
            <img :src="require('@/assets/img/icon.jpg')" alt="">
          </div>
          <div class="clearfix user-text">
          <span class="pull-left" style="line-height: 1;">
            <h4 style="display: inline-block;margin: 0">比丢</h4> <span class="level"> Lv.8</span>
          </span>
            <span class="pull-right mark" :class="{active:mark}" @click="mark=true"><i
              class="icon iconfont icon-task"></i> <span v-if="!mark">签到</span><span v-if="mark">已签</span></span>
          </div>
        </div>
        <div class="cell-group">
          <div class="cell">
            <i class="iconfont icon icon-mail"></i> <span class="cell-text">我的消息</span>
          </div>
          <div class="cell">
            <i class="iconfont icon icon-integral"></i> <span class="cell-text">会员中心</span>
          </div>
          <div class="cell">
            <i class="iconfont icon icon-guanzhu"></i> <span class="cell-text">我的收藏</span>
          </div>
        </div>
        <div class="cell-group">
          <div class="cell">
            <i class="iconfont icon icon-people"></i> <span class="cell-text">我的好友</span>
          </div>
          <div class="cell">
            <i class="iconfont icon icon-coordinates"></i> <span class="cell-text">附近的人</span>
          </div>
        </div>
        <div class="cell-group">
          <div class="cell">
            <i class="iconfont icon icon-label"></i> <span class="cell-text">个性换肤</span>
          </div>
          <div class="cell">
            <i class="iconfont icon icon-scan"></i> <span class="cell-text">扫一扫</span>
          </div>
        </div>
      </scroller>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        setVisible: false,
        selected: '1',
        transitionName: 'slide-left',
        mark: false
      }
    },
    watch: {
      selected: {
        handler (val, oldVal) {
          switch (val) {
            case '1':
              this.$router.push('/index')
              break
            case '2':
              this.$router.push('/order')
              break
            case '3':
              this.$router.push('/find')
              break
            case '4':
              this.$router.push('/user')
              break
          }
          if (val > oldVal) {
            this.transitionName = 'slide-left'
          } else {
            this.transitionName = 'slide-right'
          }
        }
      }
    },
    methods: {},
    created () {
      switch (this.$route.path) {
        case '/index':
          this.selected = '1'
          break
        case '/order':
          this.selected = '2'
          break
        case '/find':
          this.selected = '3'
          break
        case '/user':
          this.selected = '4'
          break
      }
      console.log(this.$route)
    }
  }
</script>

