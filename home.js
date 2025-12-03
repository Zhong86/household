import { logout } from './account.js';
import { state, navigate } from './script.js';

const apps = {
  Expense: '/bank', 
  Diary: '/diary'
};

//HOME
export function homePage() {
  const acc = state.account; 
  if (!acc) {
    return logout(); 
  }

  const title = document.getElementById('title'); 
  title.textContent = `${acc.user}'s Home`;
  
  const appList = document.getElementById('apps'); 
  appList.innerHTML = ''; 
  

  //app children
  for (const key in apps) {
    var div = document.createElement("div"); 
    div.className = 'appListChildren'; 

    //button
    var btn = document.createElement('button'); 
    btn.className = 'appChildrenBtn';

    //change paths on click
    btn.textContent = `${key}`;
    btn.addEventListener('click', () => onClick(apps[key])); 

    div.appendChild(btn); 
    appList.appendChild(div); 
  }
}

function onClick(path) {
  console.log(`Changing path to: ${path}`); 
  navigate(path); 
}
