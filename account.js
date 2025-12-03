import { serverPort, updateState, navigate } from './script.js';

let loginForm, registerForm; 

// ============================ LOGIN ==============================
async function login() {
  const loginBtn = loginForm.querySelector('button[type="submit"]');
  try {
    loginBtn.disabled = true; 
    loginBtn.textContent = "Loggin in..."; 

    const form = new FormData(loginForm); 
    const data = Object.fromEntries(form); 
    const json = JSON.stringify(data); 

    const result = getAcc(json);
    if (result.error) {
      const err = document.getElementById('loginError'); 
      err.textContent = data.error;
      return -1; 
    }

    loginForm.reset(); 

    updateState('account', result); 
    navigate('/home'); 
    return result; 
  } catch (error) {
    alert('Login failed. Try again');  
  }finally {
    loginBtn.disabled = false; 
    loginBtn.textContent = "Login"
  }
}

export function logout() {
  updateState('account', null); 
  navigate ('/login'); 
}

// ========================== REGISTRATION ==============================
async function regisForm() {
  const createBtn = registerForm.querySelector('button[type="submit"]');

  try {
    createBtn.disabled = true;
    createBtn.textContent = 'Creating account...';

    //process data
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data); 

    const result = await createAcc(jsonData); 

    if(result.error) {
      const err = document.getElementById('regisError'); 
      err.textContent = result.error;
      return -1; 
    }

    registerForm.reset(); 
    alert(`Welcome, ${result.user}. Your account has been created`); 

    updateState('account', result); 
    navigate('/home'); 

    return result; 
  } catch (error) {
    alert(`An unexpected error occured. Please try again`); 
  } finally {
    createBtn.disabled = false; 
    createBtn.textContent = 'Register';
  }
}

// ================================ CREATE ACC =====================================
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

// ================================= GET ACC =================================
async function getAcc(user) {
  try {
    const result = await fetch(serverPort + '/accounts' + encodeURIComponent(user.user)); 
    return await result.json(); 
  } catch (error) {
    return { error: error.message || 'Unknown error' }; 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loginForm = document.getElementById('loginForm'); 
  registerForm = document.getElementById('regisForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); 
      login(); 
    }); 
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault(); 
      regisForm();
    });
  }
}); 

