import React from 'react';
import ReactDOM from 'react-dom';
import App from './container';
import { observe } from './functions/game';

observe(positionSet =>
  ReactDOM.render(
    <App positionSet={positionSet}/>,
    document.getElementById('container')
  )
);
