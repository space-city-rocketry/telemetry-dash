import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';

const socket = io();
const app = document.getElementById('app');
ReactDOM.render(<Layout socket={socket} />, app);

socket.on('data', (data) => {
    // document.getElementById('data-log').textContent += data;
    console.log(data);
});
socket.on('status', (status) => {
    // document.getElementById('data-log').textContent += status;
    console.log(status);
});
socket.on('serial error', (err) => {
    console.log('Serial error:', err);
});
