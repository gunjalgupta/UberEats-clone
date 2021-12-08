import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from './App';

import { Provider } from 'react-redux';
import {store, persistor} from './globalStore/reducer';
import {PersistGate } from "redux-persist/integration/react";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  
</link>
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading ={null} persistor= {persistor}>
      <App />
      </PersistGate>
    </Provider>
    </ApolloProvider>,
  document.getElementById('root')
);


