import { combineReducers } from 'redux';
import repos from './repos';
import settings from './settings';

export default combineReducers({
	repos,
	settings
});
