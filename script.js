import { homePage } from './home.js'; 


export let state = Object.freeze({
  account: null
}); 
const storageKey = 'savedAcc'; 

export const serverPort = 'http://192.168.1.11:5000/api';

function init() {
  const savedAcc = localStorage.getItem(storageKey); 
  if (savedAcc) {
    updateState('account', JSON.parse(savedAcc)); 
  }

  window.onpopstate = () => updateRoute(); 
  updateRoute(); 
}

export function updateState(property, newData) {
  state = Object.freeze({
    ...state, 
    [property]: newData
  }); 
  localStorage.setItem(storageKey, JSON.stringify(state.account)); 
}

//Navigation
const routes = {
  '/login': { templateId: 'login' }, 
  '/home': { templateId: 'home', init: homePage }
}; 

function updateRoute() {
  const path = window.location.pathname; 
  const route = routes[path];
  if (!route) {
    return navigate('/home'); 
  }

  const template = document.getElementById(route.templateId); 
  const view = template.content.cloneNode(true); 
  const app = document.getElementById('app'); 
  app.innerHTML = ''; 
  app.appendChild(view); 

  if (typeof route.init ==='function') {
    route.init(); 
  }
}

export function navigate(path) {
  window.history.pushState({}, path, path); 
  updateRoute();
}

init();
