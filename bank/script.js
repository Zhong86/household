import { state, updateRoute } from '../script.js'; 
const storageKey = 'savedAcc';

function init() {
  console.log('Initializing expenses'); 
  window.onpopstate = () => updateRoute(); 
  updateRoute(); 
}

function showElement(id) {
  const element = document.getElementById(id); 
  element.style.display = 'block';
}

function hideElement(id) {
  const element = document.getElementById(id); 
  element.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const createTransBtn = document.getElementById('createTransaction'); 
  const closeTrans = document.getElementById('closeTransaction'); 

  if (createTransBtn) {
    createTransBtn.addEventListener('click', (e) => {
      e.preventDefault(); 

      showElement('createTransactionBloc');
    });    
  }

  if (closeTrans) {
    closeTrans.addEventListener('click', (e) => {
      e.preventDefault(); 
      hideElement('createTransactionBloc'); 
    }); 
  }
}); 

init(); 
