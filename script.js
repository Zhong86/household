import { homePage } from './home.js'; 

export const serverPort = 'http://192.168.1.11:5000/api';

export let state = Object.freeze({
  account: null
}); 
const storageKey = 'savedAcc'; 

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
  console.log(state); 
}

//Navigation
const routeSPA = {
  '/login': { templateId: 'login' }, 
  '/home': { templateId: 'home', init: homePage }
};

const routeMPA = [
  '/bank',
  '/diary'
];
const routes = Object.keys(routeSPA).concat(routeMPA); 

function updateRoute() {
  const path = window.location.pathname; 
  
  if (!routes.includes(path)) {
    console.log(`${path} not found`);
    return navigate('/home'); 
  }
  
  const route = routeSPA[path];
  if(route) {
    const template = document.getElementById(route.templateId); 
    const view = template.content.cloneNode(true); 
    const app = document.getElementById('app'); 
    app.innerHTML = ''; 
    app.appendChild(view); 

    if (typeof route.init ==='function') {
      route.init(); 
    }
  } else {
    navigate(path); 
  }
}

export function navigate(path) {
  window.history.pushState({}, path, path); 
  updateRoute();
}



init();
