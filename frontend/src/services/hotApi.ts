import { http } from '@/utils/http'
import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'

type HotRecommendParams = PageParams & { subType?: string }
class HotApi {
  static hotApi: HotApi = new HotApi()
  /**
   * ## 通用热门推荐类型接口
   * @param url
   *  > 特惠推荐 /hot/preference
   *
   *  > 爆款推荐 /hot/inVogue
   *
   *  > 一站买全 /hot/oneStop
   *
   *  > 新鲜好物 /hot/new
   * @param data
   *  > subType: string 可选 Tab 项的 id，默认查询全部 Tab 项的第 1 页数据
   *
   *  > pageSize: number 可选 分页数据每页条数 默认值 10
   *
   *  > page: number 可选 分页页码 默认值 1
   *
   */
  getHotRecommend(url: string, data?: HotRecommendParams) {
    return http<HotResult>({
      url,
      method: 'GET',
      data
    })
  }
}

export default HotApi.hotApi
