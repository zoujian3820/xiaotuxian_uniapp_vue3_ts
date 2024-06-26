/* eslint-disable */
// @ts-nocheck
// Generated by unplugin-vue-components
// Read more: https://github.com/vuejs/core/pull/3399

// export {}

// /* prettier-ignore */
// declare module 'vue' {
//   export interface GlobalComponents {
//     HelloWorld: typeof import('./src/components/HelloWorld.vue')['default']
//     RouterLink: typeof import('vue-router')['RouterLink']
//     RouterView: typeof import('vue-router')['RouterView']
//     Vheader: typeof import('./src/components/vheader.vue')['default']
//   }
// }

/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
// import 'vue'
// declare module 'vue' {
//   export interface GlobalComponents {
//     //
//   }
// }

import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

// 组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
export type XtxSwiperInstance = InstanceType<typeof XtxSwiper>
