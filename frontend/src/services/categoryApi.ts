import { http } from '@/utils/http'
import type { CategoryTopItem } from '@/types/category'

class CategoryApi {
  static categoryApi: CategoryApi = new CategoryApi()
  /**
   * 获取分类列表
   */
  getCategoryTop() {
    return http<CategoryTopItem[]>({
      method: 'GET',
      url: '/category/top'
    })
  }
}

export default CategoryApi.categoryApi
