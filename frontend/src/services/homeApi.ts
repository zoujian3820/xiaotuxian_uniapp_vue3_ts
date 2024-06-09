import { http } from '@/utils/http'
import type { BannerItem } from '@/types/home'

type BannerType = 1 | 2
// /**
//  * 首页广告区域 banner展示位置: 1 为首页（默认值） 2 为商品分类页
//  * @param distributionSite
//  * @returns
//  */
// export const getHomeBannerApi = (distributionSite: BannerType = 1) => {
//   return http({
//     url: '/home/banner',
//     method: 'GET',
//     data: { distributionSite }
//   })
// }

class HomeApi {
  static getHomeApi: HomeApi = new HomeApi()
  /**
   * 首页广告区域 banner展示位置: 1 为首页（默认值） 2 为商品分类页
   * @param distributionSite
   * @returns
   */
  getHomeBanner(distributionSite: BannerType = 1) {
    return http<BannerItem[]>({
      url: '/home/banner',
      method: 'GET',
      data: { distributionSite }
    })
  }
}

export default HomeApi.getHomeApi
