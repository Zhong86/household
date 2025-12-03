import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const serverPort = 'http://192.168.1.11:5000/api';

let state = Object.freeze({
  account: null
}); 
const storageKey = 'savedAcc'; 

function renderPage() {
  const acc = localStorage.getItem(storageKey);
  if(acc) {
    updateState('account', JSON.parse(acc)); 
  }

  window.onpopstate = () => updateRoute(); 
  updateRoute(); 
}

function updateState(property, newData) {
  state = Object.freeze({
    ...state, 
    [property]: newData
  }); 
  localStorage.setItem(storageKey, JSON.stringify(state.account)); 
  
  console.log(state); 
}

const routes = {
  '/login':  <App form={"login"} /> , 
  '/home': <App form={"home"} />, 
  '/expense': <App form={"expense"} />
};

function updateRoute() {
  const path = window.location.pathname; 
  const route = routes[path]; 
  if(!route) {
    return navigate('/login'); 
  }

  return root.render(
    route
  ); 
}

function navigate(path) {
  window.history.pushState({}, path, path); 
  updateRoute(); 
}
renderPage();

//======================= EXPORTS =====================
export {
  serverPort, updateState, navigate, state, routes
}; 


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
