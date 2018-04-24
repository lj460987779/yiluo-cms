import fetch from 'utils/fetch';

export function getUsers(pageSize,pageNo) {
  return fetch({
    url: 'user/getUserList',
    method: 'post',
    data:{
    	"pageSize": pageSize,
    	"pageNo": pageNo === 0?pageNo:pageNo-1
    }
  })
}
export function getUserInfo(userId) {
  return fetch({
    url: 'user/getUserInfo',
    method: 'post',
    data: {
      "userId":userId
    }
  })
}
export function deleteUser(userId) {
  return fetch({
    url: 'user/deleteUser',
    method: 'post',
    data: {
      "userId":userId
    }
  })
}
export function updateUser(userInfo) {
  return fetch({
    url: 'user/updateUser',
    method: 'post',
    data: userInfo
  })
}


