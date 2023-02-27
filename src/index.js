import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AmplifyProvider>
      <Authenticator.Provider>
        <App />
      </Authenticator.Provider>
    </AmplifyProvider>
  </React.StrictMode>
);