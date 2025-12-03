const Login = () => ( 
<section>
  <div class="container">
    <h2>Login</h2>
    <form id="loginForm" >
      <div className="formGroup">
        <label for="username">Username</label>
        <input id="username" class="formField" type="text" name="user"
            placeholder="Enter your username" required />
      </div>
      <div class="formGroup">
        <label for="pass">Password</label>
        <input id="pass" class="formField" type="text" name="pass"
            placeholder="Enter your password" required />
      </div>
      <div id="loginError" role="alert"></div>
      <button type="submit" class="acc">Login</button>
    </form>
  </div>
  <div class="container">
    <h2>Register</h2>
    <form id="regisForm" >
      <div class="formGroup">
      <label for="username">Username</label> 
      <input id="username" class="formField" type="text" placeholder="Enter new username" name="user" required
        title="Username can only include letters, numbers, and underscores" 
        pattern="[a-zA-Z0-9_]+" /> 
      </div>
      <div class="formGroup">
      <label for="pass">Password</label>
      <input id="pass" class="formField" type="text" minLength="8" pattern="[a-zA-Z0-9!@#$%^&*_]+" name="pass" required title="Password can only be letters, numbers" 
        placeholder="Enter new password" />
      </div>
      <div id="regisError" role="alert"></div> 
      <button type="submit" class="acc">Register</button>
    </form>
  </div>
</section>
) 

const App = (props) => {
  return (
    <div className="app">
      <Login />
    </div>
  ); 
}; 
