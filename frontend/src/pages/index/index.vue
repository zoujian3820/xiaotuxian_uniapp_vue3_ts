<template>
<!-- <view class="page-content"> -->
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <scroll-view scroll-y refresher-enabled @scrolltolower="onScrolltolower" @refresherpulling="onRefresherpulling"
    @refresherrefresh="onRefresherrefresh" :refresher-triggered="isTriggered" class="scroll-view">
    <!-- refresher-default-style="none" -->
    <!-- <view slot="refresher">自定义刷新样式</view> -->

    <!-- 骨架屏 => 微信小程序界面 => 右下角 眼睛图标旁边的，三个点 => 点击打开选中 生成骨架屏 -->
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>

  </scroll-view>
<!-- </view> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
// import { throttle } from '@/utils';
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue';
import HotPanel from './components/HotPanel.vue';
import PageSkeleton from './components/PageSkeleton.vue';

import homeApi from '@/services/homeApi';
import type { BannerItem, CategoryItem, HotItem } from '@/types/home';
// import XtxGuess from '@/components/XtxGuess.vue';
// import type { XtxGuessInstance } from '@/types/component'
import { useGuessList } from '@/composables'

// 获取首页轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await homeApi.getHomeBanner(1)
  bannerList.value = res.result
}
// 获取首页分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await homeApi.getHomeCategorys()
  categoryList.value = res.result
}
// 获取首页热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomHotData = async () => {
  const res = await homeApi.getHomHots()
  hotList.value = res.result
}
// 猜你喜欢, 上拉加载更多, 滚动到底部触发
// const guessRef = ref<InstanceType<typeof XtxGuess>>()
// const guessRef = ref<XtxGuessInstance>()
// const onScrolltolower = throttle((e: UniHelper.ScrollViewOnScrolltolowerEvent) => {
//   // console.log(e)
//   guessRef.value?.getMore()
// }, 200, true)

const { guessRef, onScrolltolower } = useGuessList()


// 下拉刷新控件被下拉
const onRefresherpulling = (e: UniHelper.ScrollViewOnRefresherpullingEvent) => {
  // console.log('下拉刷新控件被下拉', e)
}
// 下拉刷新被触发
const isTriggered = ref(false)
const onRefresherrefresh = async (e: UniHelper.ScrollViewOnRefresherrefreshEvent) => {
  // console.log('下拉刷新被触发', e)
  isTriggered.value = true
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomHotData(),
    guessRef.value?.getMore()
  ])
  isTriggered.value = false
}

const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomHotData()
  ])
  isLoading.value = false
})
</script>

<!--
<style lang="scss">
page {
  height: 100%;
  // height: calc(100vh - var(--window-bottom));
  // display: flex;
  // flex-direction: column;
  overflow: hidden;
}
.page-content{
  height: 100%;
  /* #ifdef APP-PLUS */
  // https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#css-%E5%8F%98%E9%87%8F
  height: calc(100% - var(--window-bottom));
  /* #endif */
  // flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
-->

<style lang="scss">
/* #ifdef APP-PLUS */
#app,
/* #endif */
page {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.scroll-view {
  flex: 1;
}
</style>

