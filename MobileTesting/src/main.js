import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
// import "@babel/polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import Container from './components/Container';

const domContainer = document.getElementById('root');

ReactDOM.render(
    <Container></Container>,
    domContainer
);