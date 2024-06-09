<template>
  <view class="content">
    <CustomNavbar />
    <XtxSwiper :list="bannerList" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import homeApi from '@/services/homeApi';
import { onLoad } from '@dcloudio/uni-app';
import type { BannerItem } from '@/types/home';

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await homeApi.getHomeBanner(1)
  bannerList.value = res.result
}
onLoad(() => {
  getHomeBannerData()
})
</script>

<style lang="scss"></style>
