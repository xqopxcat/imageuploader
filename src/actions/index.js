import axios from 'axios';

export const ROOT_URL = 'http://localhost:3000';

export const FETCH_IMAGE = 'FETCH_IMAGE';
export const POST_IMAGE = 'POST_IMAGE';

export function fetchImage(){
	const request = axios.get(`${ROOT_URL}/api/getList`);
	return {
		type: FETCH_IMAGE,
		payload: request
	};
}

export function postImage(image, callback){
	var formData = new FormData();
	formData.append("image", image);
	console.log(formData);
	const request = axios.post(`${ROOT_URL}/api/uploadfile`, formData, {
		headers: {
	    	'Content-Type': 'multipart/form-data'
	    }
	}).then(() => callback());
	return {
		type: POST_IMAGE,
		payload: request
	};
}