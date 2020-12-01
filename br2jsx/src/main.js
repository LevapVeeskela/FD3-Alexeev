"use strict";

import './assets/css/style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Container from './components/Container';

const domContainer = document.getElementById('root');

ReactDOM.render(
    <Container></Container>,
    domContainer
);