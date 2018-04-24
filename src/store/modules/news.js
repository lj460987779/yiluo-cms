const news = {
  state: {
  	newsId:'',
    newsTitle:'',
    newsContent:'',
    newsTag:'',
    createTime:''
  },

  mutations: {
    SET_NEWSTAG: (state, newsTag) => {
      state.newsTag = newsTag;
    },
    SET_NEWSTITLE: (state, newsTitle) => {
      state.newsTitle = newsTitle;
    },
    SET_NEWSCONTENT: (state, newsContent) => {
      state.newsContent = newsContent;
    },
    SET_NEWSID: (state, newsId) => {
      state.newsId = newsId;
    },
    SET_NEWSDATE: (state, createTime) => {
      state.createTime = createTime;
    }
  },

  actions: {
    // 设置要编辑的新闻信息
    setNews({ commit }, newsInfo) {
      commit('SET_NEWSTAG', newsInfo.newsTag);
      commit('SET_NEWSTITLE', newsInfo.newsTitle);
      commit('SET_NEWSCONTENT', newsInfo.newsContent);
      commit('SET_NEWSID', newsInfo.newsId);
      commit('SET_NEWSDATE', newsInfo.createTime);
    }
   
  }
};

export default news;



