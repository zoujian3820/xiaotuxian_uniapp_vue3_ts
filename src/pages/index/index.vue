<template>
  <view class="content">
    <CustomNavbar></CustomNavbar>
    <text>{{ title }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
const title = ref('Hello mao')
</script>

<style lang="scss"></style>
