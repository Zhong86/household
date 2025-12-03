import './Acc.css';
import { Login, Register } from './account.js';

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
