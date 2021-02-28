import axios from 'axios'
import { config } from './config'

const api = axios.create({
	baseUrl: config.apiUrl
})


api.interceptors.request.use(
	config => {
		const user = JSON.parse(localStorage.getItem('user'))
		if (user && user.token)
			config.headers.common['Authorization'] = 'Bearer ' + user.token

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export { api }