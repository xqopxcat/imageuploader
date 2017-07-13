import axios from 'axios';

export const ROOT_URL = 'http://localhost:3000';

export const FETCH_IMAGE = 'FETCH_IMAGE';

export function fetchImage(){
	const request = axios.get(`${ROOT_URL}/api/getList`);
	return {
		type: FETCH_IMAGE,
		payload: request
	};
}