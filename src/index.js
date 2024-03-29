import React from 'react';
import {render}from 'react-dom';
import {Provider } from 'react-redux'
import {store} from './ducks'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
