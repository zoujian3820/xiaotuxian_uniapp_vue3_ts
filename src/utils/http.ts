import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加request请求拦截器（uni本身自带方法 addInterceptor）
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 请求前添加请求头
    uni.setStorageSync('token', '')
    uni.setStorageSync('XiaoToken', '')
    uni.setStorageSync('XiaoUserId', '')
    // 1.非http开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2.请求超时 改为10s
    options.timeout = 10000

    // 3.添加小程序端情求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp'
    }
    // 4,添加token请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    // console.log(options)
  }
}

uni.addInterceptor('uploadFile', httpInterceptor)
uni.addInterceptor('request', httpInterceptor)

/**
 * 扩展request请求响应拦截器（uni本身没这个功能，需自行扩展）
 * @param UniApp.RequestOptions
 * @returns Promise
 * 1. 返回promise
 * 2. 请求成功
 *  2.1 提取核心数 res.data
 *  2.2 添加类型，支持泛型
 * 3. 请求失败
 *  3.1 网络错误 -> 提示用户换网络
 *  3.2 401错误 -> 清理用户信息，跳转到登录页
 *  3.3 其他错误 -> 根据后端错误信息轻提示
 */

interface Data<T> {
  code: string
  msg: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  // 1. 返回promise
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 2. 请求成功
      success(res) {
        console.log(res)
        const resData = res.data as Data<T>
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数 res.data
          // 2.2 添加类型，支持泛型
          resolve(resData)
        } else if (res.statusCode === 401) {
          // 3.2 401错误 -> 清理用户信息，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 3.3 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            title: resData.msg || '请求错误',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail(err) {
        // 3.1 网络错误
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}
