import fetch from 'utils/fetch';

export function getNews(pageSize,pageNo) {
  return fetch({
    url: 'news/getNewsList',
    method: 'post',
    data:{
    	"pageSize": pageSize,
    	"pageNo": pageNo === 0?pageNo:pageNo-1
    }
  })
}

export function postNews(newsInfo) {
  return fetch({
    url: 'news/addNewsInfo',
    method: 'post',
    data:newsInfo
  })
}

export function updateNews(newsInfo) {
  return fetch({
    url: 'news/updateNewsInfo',
    method: 'post',
    data:newsInfo
  })
}

export function deleteNewsInfo(newsId) {
  return fetch({
    url: 'news/deleteNewsInfo',
    method: 'post',
    data:{
      "newsId":newsId
    }
  })
}