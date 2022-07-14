import request from '@/utils/request.js'

//导出API
export const getArticleListAPI = function(page, limit){
  return request.get('/articles', {
    params: {
      _page: page,
      _limit: limit
    }
  })
}