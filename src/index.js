import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.css';
import { StoreProvider } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter
    // basename={window.location.pathname || ''}
    >
        <GlobalStyle>
            <StoreProvider>
                <App />
            </StoreProvider>
        </GlobalStyle>
    </HashRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
