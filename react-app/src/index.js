import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderPage() {

  window.onpopstate = () => updateRoute(); 
  updateRoute(); 
}

const routes = {
  '/login':  <App path={"login"} /> , 
  '/home': <App path={"home"} />, 
  '/expense': <App path={"expense"} />,  
  '/gallery': <App path={"gallery"} />
};

function updateRoute() {
  const path = window.location.pathname; 
  const route = routes[path]; 
  if(!route) {
    return navigate('/login'); 
  }

  return root.render(route); 
}

function navigate(path) {
  window.history.pushState({}, path, path); 
  updateRoute(); 
}
renderPage();

//======================= EXPORTS =====================
export {
  navigate, routes
}; 

