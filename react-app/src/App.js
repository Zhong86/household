import './App.css';
import Acc from './pages/Acc';
import Home from './pages/Home';
// import Expense from './pages/Expense'; 
// import Diary from './pages/Diary'; 
import { StateContext } from './context/AppContext'; 
import useAppData from './hooks/useAppData'; 

export default function App({path}) {
  const { data, dispatch } = useAppData(); 

  return (
    <StateContext value={{data, dispatch}}>
      <div className="App">
        {getPage(path)}
      </div>
    </StateContext>
  ); 
}

function getPage(path) {
  switch (path) {
    case "login":
      return <Acc />; 
    case "home": 
      return <Home name={data.user}/>; 
    // case "expense": 
    //   return <Expense />; 
    // case "diary":
    //   return <Diary />; 
    default:
      return <Acc />; 
  }
}
