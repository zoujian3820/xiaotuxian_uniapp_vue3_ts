<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button @tap="
      memberStore.setProfile({
        nickname: '张三',
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        gender: '男',
        birthday: '1990-01-01',
        signature: '这个人很懒，什么都没留下',
        phone: '13812345678',
        email: 'zhangsan@qq.com',
        city: '北京',
        province: '北京',
        country: '中国',
        token: 'abcldf4566666'
      })
      " size="mini" plain type="primary">
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData" size="mini" plain type="default">测试请求</button>
  </view>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { http } from '@/utils/http'
// import { storeToRefs } from 'pinia';
type BannerItem = {
  hrefUrl: string
  imgUrl: string
  id: string
  type: string
}
const memberStore = useMemberStore()
const getData = async () => {
  const res = await http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner'
    // url: '/member/profile'
  })
  console.log(res)
}
</script>
<style lang="scss"></style>
