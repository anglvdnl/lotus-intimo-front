import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reduxStore from './core/store/store';
import { Provider } from 'react-redux';
import { initFacebookSdk } from './data/utils/facebook';

initFacebookSdk().then(() => startApp());

const startApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );

  reportWebVitals();
}
