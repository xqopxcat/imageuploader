import { combineReducers } from 'redux';
import ImageReducer from './reducer_images';


const rootReducer = combineReducers({
		images: ImageReducer
});

export default rootReducer;
