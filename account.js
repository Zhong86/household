import { serverPort } from './script.js';
const registerForm = document.getElementById('regisForm');

async function regisForm() {
  const createBtn = registerForm.querySelector('button[type="submit"]');
  
  try {
    createBtn.disabled = true;
    createBtn.textContent = 'Creating account...';

    //process data
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data); 
    
    console.log(jsonData);

    const result = await createAcc(jsonData); 

    if(result.error) {
      const err = document.getElementById('regisError'); 
      err.textContent = result.error;
      return -1; 
    }
    
    alert(`Welcome, ${result.user}. Your account has been created`); 

    registerForm.reset(); 

    return result; 
  } catch (error) {
    alert(`An unexpected error occured. Please try again`); 
  } finally {
    createBtn.disabled = false; 
    createBtn.textContent = 'Register';
  }
}

async function createAcc(acc) {
  try {
    const result = await fetch(serverPort + '/accounts', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: acc
    });

    if(!result.ok) {
      throw new Error(`HTTP error. Status: ${result.status}`); 
    }
    return await result.json(); 
  } catch (error) {
    console.error('Account creation failed: ', error);
    return { error: error.message || 'Network error occured' }; 
  }
};

registerForm.addEventListener('submit', (e) => {
  e.preventDefault(); 
  regisForm();
});
