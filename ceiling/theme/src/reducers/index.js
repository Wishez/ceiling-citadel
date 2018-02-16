import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navigation from './navigation';
import app from './app';
import cart from './cart';
import callback from './callback';
import order from './order';
import catalog from './catalog';

const rootReducer = combineReducers({
  form: formReducer,
  navigation,
  app,
  cart,
  callback,
  order,
  catalog
});


export default rootReducer;
