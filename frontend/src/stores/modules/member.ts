import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginResult } from '@/types/member'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<LoginResult>()

    // 保存会员信息，登录时使用
    const setProfile = (val: LoginResult) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile
    }
  },
  // TODO: 持久化
  {
    // persist: true // 开启数据持久化, 此方案只适用于h5网页端
    persist: {
      storage: {
        // 改用uniapp的存储方式
        getItem: (key: string) => uni.getStorageSync(key),
        setItem: (key: string, value: any) => uni.setStorageSync(key, value)
      }
      // paths: ['profile'] // 需要持久化的数据
    }
  }
)
