/* import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './modules/components/Login';
import { Provider } from 'react-redux';
import store from './modules/components/store/UserStore'

ReactDOM.render(
  <Provider store={store}>
    <LoginForm />
  </Provider>,
  document.getElementById('app')
);
 */

// BrowserHistory/hashHistory Tutorial- http://czytelny.com/post/2016/react_browserhistory/
//Another tutorial for browserHistory/HashHistory-https://code.i-harness.com/en/q/229bc93
//Another tutorial = https://medium.com/@pshrmn/a-little-bit-of-history-f245306f48dd

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
//import { Router, hashHistory } from 'react-router';

import routes from './modules/routes';
import rootReducer from './modules/components/rootReducers';
import Modal from 'react-modal'
 
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose  } from 'redux';
import ReduxPromise from 'redux-promise';

import { configureFakeBackend } from './modules/components/helpers/FakeBackend';
Modal.setAppElement('#app')

configureFakeBackend();

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxPromise))); */

const store = createStore(
  rootReducer,
  compose(
  // (state = {}) => state,
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)


//Using browserHistory

ReactDOM.render(
   <Provider store = {store}>
      <Router history = {browserHistory} routes = {routes} />
   </Provider>, document.getElementById('app'));


//Using hashHisoty
/* 
ReactDOM.render(
  <Provider store = {store}>
     <Router history = {hashHistory} routes = {routes} />
  </Provider>, document.getElementById('app')); */