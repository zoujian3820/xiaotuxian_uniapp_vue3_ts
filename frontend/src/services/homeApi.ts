import { http } from '@/utils/http'
import type { BannerItem, CategoryItem, HotItem, GuessItem } from '@/types/home'
import type { PageParams, PageResult } from '@/types/global'

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
  /**
   * 查询首页前台分类接口，只查询一级类目信息（此处pc和app、mini共用了一套前台类目信息）无需参数
   * @returns
   */
  getHomeCategorys() {
    return http<CategoryItem[]>({
      url: '/home/category/mutli',
      method: 'GET'
    })
  }
  /**
   * 首页-热门推荐 无参
   * @returns
   */
  getHomHots() {
    return http<HotItem[]>({
      url: '/home/hot/mutli',
      method: 'GET'
    })
  }
  /**
   * 猜你喜欢接口
   * @param data
   * data: { page: number; pageSize: number }
   * page 页码 默认值为1
   * pageSize 每页数量 默认值为10
   * @returns
   */
  getHomeGoodsGuessLike(data: PageParams) {
    return http<PageResult<GuessItem>>({
      url: '/home/goods/guessLike',
      method: 'GET',
      data
    })
  }
}

export default HomeApi.getHomeApi
