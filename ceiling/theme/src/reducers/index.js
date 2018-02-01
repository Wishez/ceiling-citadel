import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navigation from './navigation.js';
import app from './app.js';
import cart from './cart.js';

const rootReducer = combineReducers({
	form: formReducer,
	navigation,
	app,
	cart
});


export default rootReducer;