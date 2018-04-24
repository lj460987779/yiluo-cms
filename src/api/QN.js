import fetch from 'utils/fetch';

export function getQNToken() {
	return fetch({
		url: 'pay/getQNToken',
		method: 'post'
	})
}

export function UploadQN(formData) {
	return fetch({
		url: 'http://upload.qiniu.com/',
		data: formData,
		method:"POST",
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}