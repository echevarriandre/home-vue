import axios from 'axios';

import { config } from '../config'

const API_LINKS_URL = `${config.apiUrl}/links/`;

class LinkService {
	getAll() {
		return axios.get(API_LINKS_URL);
	}

	getLinkById(id) {
		return axios.get(API_LINKS_URL + id);
	}

	updateLinkById(id, data) {
		return axios.post(API_LINKS_URL + id, data);
	}

	deleteLinkById(id) {
		return axios.delete(API_LINKS_URL + id);
	}
}

export default new LinkService();