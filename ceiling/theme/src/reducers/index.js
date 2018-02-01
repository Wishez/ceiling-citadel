import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navigation from './navigation';
import app from './app';
import cart from './cart';
import callback from './callback';

const rootReducer = combineReducers({
	form: formReducer,
	navigation,
	app,
	cart,
	callback
});


export default rootReducer;