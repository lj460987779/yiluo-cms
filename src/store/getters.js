const getters = {
  newsId: state => state.news.newsId,
  newsTitle: state => state.news.newsTitle,
  newsContent: state => state.news.newsContent,
  newsTag: state => state.news.newsTag,
  createTime: state => state.news.createTime
};
export default getters