import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from './lmac1.json';
import Monitor from './components/Monitor2.js';

var demoMode = true;
var demoIndex =-1;
var bodyParam = null;


function newBodyParamHandler(value){
  bodyParam= value;
  //console.log('Uodating Bp');
}

ReactDOM.render(<App bodyParam={bodyParam}/>, document.getElementById('soundsSettings'));
ReactDOM.render(
  <Monitor
    newBodyParam = {(value)=> newBodyParamHandler(value)}
  />,
  document.getElementById('bodyMonitor')
);
