import { useReducer, useEffect } from 'react'; 
import dataReducer from './DataReducer'; 
const storageKey = 'savedData'; 

export default function useAppData() {
  const [data, dispatch] = useReducer(dataReducer, getInitialData());
  
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data)); 
  }, [data]); 

  return { data, dispatch }; 
}

function getInitialData() {
  const empty = { account: null, expense: null, diary: null }; 
  return localStorage.getItem(storageKey) 
    ? JSON.parse(localStorage.getItem(storageKey)) : empty; 
}
