import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { ApolloProvider } from "@apollo/react-hooks"
import client from "./apollo"

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render( 
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

