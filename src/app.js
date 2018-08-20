import React from 'react';
import ReactDOM from 'react-dom';

//Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import AppRouter from './routers/AppRouter';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import panel from './reducers/panel';
import overlay from './reducers/overlay';
import windstop from './reducers/windstop'; 

const allReducers = combineReducers({
  windstop, panel, overlay
})

const store = createStore(
  allReducers,
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(<Provider store={store} ><AppRouter /></Provider>, document.getElementById('app'));
  