// import axios from 'axios'

import { api } from '../interceptor'
import { config } from '../config'

const API_LINKS_URL = `${config.apiUrl}/links/`

class LinkService {
	all() {
		return api.get(API_LINKS_URL)
	}

	find(id) {
		return api.get(API_LINKS_URL + id)
	}

	update(id, data) {
		return api.post(API_LINKS_URL + id, data)
	}

	delete(id) {
		return api.delete(API_LINKS_URL + id)
	}
}

export default new LinkService()