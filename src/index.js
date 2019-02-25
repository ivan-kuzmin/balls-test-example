import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/assets/css/spinner.css';
import 'src/assets/css/style.css';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('app'));
