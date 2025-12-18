import { navigate } from '../index.js';
import { useRef, useContext, useState } from 'react';
import { StateContext } from '../context/AppContext'; 
import { createAcc, getAcc } from '../api/accFetch'; 

// ============================ LOGIN ==============================
const Login = () => {
  const { dispatch } = useContext(StateContext); 
  const [submitting, setSubmitting] = useState(false); 
  const [error, setError] = useState(''); 
  const loginFormRef = useRef(null); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(!loginFormRef.current) return; 
    const loginForm = loginFormRef.current; 

    if(!loginForm.checkValidity()) {
      loginForm.classList.add('was-validated'); 
      return; 
    }

    setSubmitting(true); 
    try {
      const form = new FormData(loginForm); 
      const data = Object.fromEntries(form); 
      const result = await getAcc(data);

      if (result.error) {
        setError(result.error); 
        return; 
      }  
   
      dispatch({
        type: 'setAcc', 
        account: result
      });
      dispatch({type: 'setExpense', expense: null}); 
      dispatch({type: 'setGaller', gallery: null}); 

      loginForm.reset(); 
      setError(''); 
      navigate('/home'); 
    } catch (error) {
      setError(error.message); 
    } finally {
      setSubmitting(false); 
      loginForm.classList.remove('was-validated'); 
    }
  }; 

  return (
    <form ref={loginFormRef} onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="username">Username</label> <br />
        <input id="username" className="form-control" type="text" name="user"
          placeholder="Enter your username" required />  
      </div>
      <div className="mb-3">
        <label htmlFor="pass">Password</label>  <br />
        <input id="pass" className="form-control" type="text" name="pass"
          placeholder="Enter your password" required />  
      </div>
      { error !== '' &&
        <div className="alert alert-danger" role="alert">{error}</div>  }
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary"
          disabled={submitting}>Login</button>
      </div>
    </form>
  ); 
}; 

// ========================== REGISTRATION ==============================
const Register = () => {
  const { dispatch } = useContext(StateContext); 
  const [submitting, setSubmitting] = useState(false); 
  const [error, setError] = useState(''); 
  const regisFormRef = useRef(null);  

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(!regisFormRef.current) return; 
    const registerForm = regisFormRef.current; 

    if (!registerForm.checkValidity()) {
      registerForm.classList.add('was-validated');
      return; 
    }

    setSubmitting(true); 
    try {
      //process data
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData);
      const jsonData = JSON.stringify(data); 

      const result = await createAcc(jsonData); 

      if(result.error) {
        setError(result.error); 
        return; 
      }

      dispatch({
        type: 'setAcc',
        account: result
      }); 

      registerForm.reset(); 
      setError(''); 
      navigate('/home'); 
    } catch (error) {
      setError(error.message); 
    }  finally {
      setSubmitting(false); 
      registerForm.classList.remove('was-validated');
    }
  }; 

  return (
    <form id="regisForm" ref={regisFormRef} onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="username">Username</label> <br />
        <input id="username" className="form-control" type="text" placeholder="Enter new username" name="user" required
          title="Username can only include letters, numbers, and underscores" 
          pattern="[a-zA-Z0-9_]+" />  
      </div>
      <div className="mb-3">
        <label htmlFor="pass">Password</label> <br />
        <input id="pass" className="form-control" type="text" minLength="8" pattern="[a-zA-Z0-9!@#$%^&*_]+" name="pass" required title="Password can only be letters, numbers" 
          placeholder="Enter new password" />  
      </div>
      { error !== '' && 
        <div className="alert alert-danger" role="alert">{error}</div> }  
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-secondary" 
          disabled={submitting}>Register</button>
      </div>
    </form>
  ); 
}; 


const LoginPage = () => (
  <>
    <div className="d-flex flex-column justify-content-center vh-100">
      <div className="box">
        <h2>Login</h2>
        <Login />
      </div>
      <div className="box">
        <h2>Register</h2>
        <Register />
      </div>

    </div>
  </>
);

export default LoginPage;
