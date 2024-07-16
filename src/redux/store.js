import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootreducer from './rootreducer';
const middleware = [thunk];
const store = createStore(
  rootreducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
