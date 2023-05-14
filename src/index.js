// Libaries
import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Modules
// import { store } from './store';
import GlobalStyles from 'components/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            {/* <Provider store={store}> */}
            <App />
            {/* </Provider> */}
        </GlobalStyles>
    </React.StrictMode>,
);
