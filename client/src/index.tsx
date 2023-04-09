import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthProvider';
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client';
import { auth } from './firebaseSetup';

const getAccessToken = async (uri: string, options: any) => {
  const token = await auth.currentUser?.getIdToken()

  options.headers = {
    ...options.headers,
    authorization: `Bearer ${token}`,
  };

  return fetch(uri, options);
};

const httpLink = new HttpLink({
  fetch: getAccessToken,
  uri: 'https://localhost:7253/graphql',
});

const apolloClient = new ApolloClient({
  link: from([
    httpLink
  ]),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
          <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
