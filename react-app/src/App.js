import './App.css';
import Acc from './pages/Acc';
import Home from './pages/Home';
import Expense from './pages/Expense'; 
import { StateContext } from './context/AppContext'; 
import { useState } from 'react'; 


function App({path}) {
  const [data, setData] = useState(null); 

  let Page = ({children}) => {
    <StateContext value={[data, setData]}>
      <div className="App">
        {children}
      </div>
    </StateContext>
  }; 
  switch (path) {
    case "login":
      return (
        <Page> <Acc /> </Page>
      ); 
    case "home": 
      return (
        <Page> <Home /> </Page>
      ); 
    case "expense": 
      return (
        <Page> <Expense /> </Page>
      ); 
    case "diary":
      return (
        <Page> <Diary /> </Page>
      ); 

    default:
      return (
        <Page> <Acc /> </Page>
      ); 
  }
}

export default App;
