import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.css';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {store, StoreContext} from './stores/stores';
import 'react-toastify/dist/ReactToastify.css';

export const appHistory = createBrowserHistory();

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <Router history={appHistory}>
            <App/>
        </Router>
    </StoreContext.Provider>,
  document.getElementById('root')
);

reportWebVitals();
