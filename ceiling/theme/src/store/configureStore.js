import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
import { composeWithDevTools } from 'remote-redux-devtools';

let compositionEnhance = null;
if (process.env.NODE_ENV === 'development') {
  compositionEnhance = composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  );
} else {
  compositionEnhance = compose(applyMiddleware(thunkMiddleware));
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compositionEnhance
  );

  return store;
}
