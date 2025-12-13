import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

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
  '/login':  <App stateInfo={} path={"login"} /> , 
  '/home': <App path={"home"} />, 
  '/expense': <App path={"expense"} />,  
  '/diary': <App path={"diary"} />
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

