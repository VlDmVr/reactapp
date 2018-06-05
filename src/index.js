import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from '../reducers';
import './main.css';
import Routers from './resourses/Routers';

const store = createStore(allReducers);

ReactDOM.render(
    <div id="mainWrapper">
        <Provider store={store}>
            <Routers />
        </ Provider>
    </div>, 
    document.getElementById('app')
);

