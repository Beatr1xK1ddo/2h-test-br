import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'mobx-react';
import { BrowserRouter } from "react-router-dom";

import { store } from './store';
import { App } from './App';

const container = document.getElementById('root')  as HTMLElement;

if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider {...store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    );
}