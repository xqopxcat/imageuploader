import _ from 'lodash';
import { GET_IMAGE }  from '../actions';

export default function(state = [], action){
	switch(action.type){
		case GET_IMAGE:
			console.log(action.payload.data);
			return action.payload.data;
		default:
			return state;
	}
	return state;
}