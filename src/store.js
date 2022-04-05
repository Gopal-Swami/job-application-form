import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { submitApplicationReducer } from './reducers/formReducers';
// Storing reducers to states of store so it can be accessible within the all components of application
const reducer = combineReducers({
  submitApplicationState: submitApplicationReducer,
});
// Initial State is empty here as there are no functionality to store any state in local storage such as User Info or Any Token
const initialState = {};
// Applied Middleware to use functionalities of UseDispatch and Use Selector from 'react-redux
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
