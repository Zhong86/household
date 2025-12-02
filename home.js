import { logout } from './login.js';
import { state } from './script.js';
//HOME
export function homePage() {
  const acc = state.acc; 
  if (!acc) {
    return logout(); 
  }
}
