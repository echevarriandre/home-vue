import axios from 'axios';

import { config } from '../config'

const API_AUTH_URL = `${config.apiUrl}/login`;

class AuthService {
	login(data) {
		return axios.post(API_AUTH_URL, data);
	}

	logout() {
		sessionStorage.removeItem('user')
	}
}

export default new AuthService();