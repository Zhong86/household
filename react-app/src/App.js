import './App.css';
import { state } from './index.js';
import Acc from './pages/Acc';
import Home from './pages/Home';
import Expense from './pages/Expense'; 
import Diary from './diary/Diary';


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
      Page = ( <Home name={state.account.user}/> ); 
      console.log('Page: home'); 
      break;
    case "expense": 
      Page = ( <Expense expense={props.expense}/> ); 
      console.log('Page: expense'); 
      break;
    case "diary":
      Page = ( <Diary /> ); 
      console.log("Page: diary"); 
      break;

    default:
      Page = (
        <Acc />
      ); 
      break;
  }

  return Page;
}

export default App;
