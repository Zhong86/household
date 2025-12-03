import './App.css';
import Acc from './account/Acc';
import Home from './home/Home';
import { state } from './index.js';


function App(props) {
  let Page = ( 
    <div className="App">

    </div>
  ); 
  switch (props.form) {
    case "login":
      console.log('Page: login'); 
      Page = (
        <Acc />
      ); 
      break;
    case "home": 
      console.log('Page: home'); 
      Page = ( <Home name={state.account.user}/> ); 
      break;
    case "expense": 
      console.log('Page: expense'); 
      break;

    default:
      break;
  }

  return Page;
}

export default App;
