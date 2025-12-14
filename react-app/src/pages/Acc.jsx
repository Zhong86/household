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
    setSubmitting(true); 
    const loginForm = loginFormRef.current; 

    try {
      const form = new FormData(loginForm); 
      const data = Object.fromEntries(form); 
      const result = await getAcc(data);

      if (result.error) {
        setError(result.error); 
        setSubmitting(false); 
        return; 
      }  
   
      dispatch({
        type: 'setAcc', 
        account: result
      });

      loginForm.reset(); 
      setSubmitting(false); 
      setError(''); 
      navigate('/home'); 
    } catch (error) {
      setError(error.message); 
      setSubmitting(false); 
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
      <div role="alert">{error}</div>  
      <button type="submit" className="submitForm"
        disabled={submitting}>Login</button>
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
    const registerForm = regisFormRef.current; 

    try {
      //process data
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData);
      const jsonData = JSON.stringify(data); 

      const result = await createAcc(jsonData); 

      if(result.error) {
        setError(result.error); 
        setSubmitting(false); 
        return; 
      }
      
      dispatch({
        type: 'setAcc',
        account: result
      }); 

      registerForm.reset(); 
      setSubmitting(false); 
      setError(''); 
      navigate('/home'); 
    } catch (error) {
      setError(error.message); 
      setSubmitting(false); 
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
      <div role="alert">{error}</div>  
      <button type="submit" className="submitForm" 
        disabled={submitting}>Register</button>
    </form>
  ); 
}; 


const LoginPage = () => (
  <>
    <div className="container">
      <h2>Login</h2>
      <Login />
    </div>
    <div className="container">
      <h2>Register</h2>
      <Register />
    </div>
  </>
);

export default LoginPage;
