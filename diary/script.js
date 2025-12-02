const serverPort = 'http://192.168.1.11:5000/api';

function init() {
  window.onpopstate = () => updateRoute();
  updateRoute();
}

const routes = {
  '/diary-main': { templateId: 'main', init: entriesStyle }, 
  '/diary-entry': { templateId: 'entry' }
};

function navigate(path) {
  window.history.pushState({}, path, path); 
  updateRoute();
}

function updateRoute() {
  const path = window.location.pathname; 
  const route = routes[path];
  if (!route) {
    console.log('route not found'); 
    return navigate('/diary-main'); 
  }

  const template = document.getElementById(route.templateId); 
  const templateInner = template.content.cloneNode(true); 
  const page = document.getElementById('page'); 

  page.innerHTML = '';
  page.appendChild(templateInner); 
 
  if(typeof route.init === "function") 
    route.init();
  console.log('template: ' + route.templateId);
}

//STYLE
let list = true;
function entriesStyle() {
  let styleId = '';
  if (list) {
    styleId = 'list';
  } else {
    styleId = 'grid';
  }

  const template = document.getElementById(styleId);
  const templateInner = template.content.cloneNode(true);
  const container = document.getElementById('entries');

  container.innerHTML = '';
  container.appendChild(templateInner); 
}

//GET ENTRIES
async function getEntry(user) {
  try {
    const response = await fetch(serverPort+'/accounts' + encodeURIComponent(user));
    return await response.json();
  } catch (error) {
    return {error:error.message };
  }
}

init();
