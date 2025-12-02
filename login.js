import { updateState, navigate } from './script.js'; 

//LOGIN
function login() {
  
}

export function logout() {
  updateState('account', null); 
  navigate ('/login'); 
}
