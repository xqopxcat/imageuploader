import _ from 'lodash';
import { FETCH_IMAGE, POST_IMAGE }  from '../actions';

export default function(state = [], action){
	switch(action.type){
		case FETCH_IMAGE:
			return _.mapKeys(action.payload.data, 'name');
		case POST_IMAGE:
			return _.mapKeys(action.payload.data, 'filename');
	}
	return state;
}