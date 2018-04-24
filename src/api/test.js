import fetch from 'utils/fetch';

export function pay() {
  return fetch({
    url: 'pay/getQNToken',
    method: 'post'
  })
}

export function pay2(form) {
  return fetch({
    url: 'pay/toPay2',
    method: 'post',
    data:form
  })
}

