// src/index.tsx
import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

const ReduxProviderApp: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(ReduxProviderApp);
