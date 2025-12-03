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

async function onClick(path) {
  console.log(`Changing path to: ${path}`); 
  const result = await loadHTML(`${path}/index.html`); 
  
  if(result !== 0) {
    console.log('Load HTML error'); 
  }
  
//  window.history.pushState({}, '', `/${path}`); 
  window.history.pushState({}, '', 'http://192.168.1.11:3000/bank');
  navigate('/bank'); 
}

async function loadHTML(filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    const app = document.getElementById('app')
    app.innerHTML = html; 
    return 0; 
  } catch (error) {
    console.error('Load page failed: ', error); 
  }
}
