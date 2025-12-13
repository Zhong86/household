import { serverPort, updateState, navigate } from '../index.js';
import { useRef } from 'react';
import { useContext } from 'react'; 
import { StateContext } from './context/AppContext'; 

// ============================ LOGIN ==============================
const Login = () => {
  const loginFormRef = useRef(null); 
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log('login clicked'); 
    const loginForm = loginFormRef.current; 
    const loginBtn = loginForm.querySelector('button[type="submit"]'); 

    try {
      loginBtn.disabled = true; 
      loginBtn.textContent = "Loggin in..."; 

      const form = new FormData(loginForm); 
      const data = Object.fromEntries(form); 
      
      const result = await getAcc(data);
      if (result.error) {
        const err = document.getElementById('loginError'); 
        err.textContent = data.error;
      }

      loginForm.reset(); 

      updateState('account', result); 
      navigate('/home'); 

      return result; 
    } catch (error) {
      alert('Login failed. Try again'); 
    } finally {
      loginBtn.disabled = false; 
      loginBtn.textContent = "Login"
    }
  }; 

  return (
    <form id="loginForm" ref={loginFormRef} onSubmit={handleSubmit} >
      <div className="formGroup">
        <label htmlFor="username">Username</label> <br />
        <input id="username" className="formField" type="text" name="user"
          placeholder="Enter your username" required />  
      </div>
      <div className="formGroup">
        <label htmlFor="pass">Password</label>  <br />
        <input id="pass" className="formField" type="text" name="pass"
          placeholder="Enter your password" required />  
      </div>
      <div id="loginError" role="alert"></div>  
      <button type="submit" className="submitForm">Login</button>
    </form>
  ); 
}; 

function logout() {
  updateState('account', null); 
  navigate ('/login'); 
}

// ========================== REGISTRATION ==============================
const Register = () => {
  const regisFormRef = useRef(null);  
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const registerForm = regisFormRef.current; 
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
  }; 

  return (
    <form id="regisForm" ref={regisFormRef} onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="username">Username</label> <br />
        <input id="username" className="formField" type="text" placeholder="Enter new username" name="user" required
          title="Username can only include letters, numbers, and underscores" 
          pattern="[a-zA-Z0-9_]+" />  
      </div>
      <div className="formGroup">
        <label htmlFor="pass">Password</label> <br />
        <input id="pass" className="formField" type="text" minLength="8" pattern="[a-zA-Z0-9!@#$%^&*_]+" name="pass" required title="Password can only be letters, numbers" 
          placeholder="Enter new password" />  
      </div>
      <div id="regisError" role="alert"></div>  
      <button type="submit" className="submitForm">Register</button>
    </form>
  ); 
}; 


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
    console.log(result); 
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
    const response = await fetch(serverPort + '/accounts/' + encodeURIComponent(user.user), {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(user)
    });

    if(!response.ok) {
      return console.error('Get user error ', response.error); 
    }
    return await response.json(); 
  } catch (error) {
    return { error: error.message || 'Unknown error' }; 
  }
}

const LoginPage = () => (
  <section>
    <div className="container">
      <h2>Login</h2>
      <Login />
    </div>
    <div className="container">
      <h2>Register</h2>
      <Register />
    </div>
  </section>
);

export default LoginPage;
export { logout }; 
