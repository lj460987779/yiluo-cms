import { login } from '../../api/auth.js';


const user = {
  state: {
    token:'',
    userId:'',
    nickname:'',
    username:'',
    phone:''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    SET_NAME: (state, username) => {
      state.username = username;
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone;
    }
  },

  actions: {
    // 登录
    LoginByPhone({ commit }, userInfo) {
      const username = userInfo.username;
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(username, password).then(response => {
          console.log("store-->modules-->user-->LoginByPhone res:",response)
          const data = response.data;
          commit('SET_TOKEN', data.token);
          commit('SET_USERID', data.userId);
          commit('SET_NICKNAME', data.nickname);
          commit('SET_NAME', data.username);
          commit('SET_PHONE', data.phone);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }
   
  }
};

export default user;



