import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './router';

import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
