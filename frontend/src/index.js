import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {store, persistor} from './globalStore/reducer';
import {PersistGate } from "redux-persist/integration/react";


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  
</link>
ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading ={null} persistor= {persistor}>
      <App />
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);


