import { routes, navigate } from '../index.js'; 
import { useRef, useContext, useEffect, useMemo } from 'react'; 
import { getExpense } from '../api/expenseFetch'; 
import { getGallery } from '../api/galleryFetch'; 
import { StateContext } from '../context/AppContext';
import Profile from '../components/Profile';

const loadExpense = async ({data, dispatch}) => {
  const expenseData = await getExpense(data.account._id); 
  if(expenseData.error) return; 

  dispatch({
    type: 'setExpense', 
    expense: expenseData
  }); 
};
const loadGallery = async({data, dispatch}) => {
  const galleryData = await getGallery(data.account._id); 
  if (galleryData.error) return; 

  dispatch({
    type: 'setGallery', 
    gallery: galleryData
  }); 
}; 

const Button = () => {
  const btnRef = useRef(null); 

  const handleClick = (e) => {
    e.preventDefault(); 
    if (btnRef.current) {

    }
    console.log('Opened profile'); 
  };

  return (
    <Profile handleClick={handleClick}/>
  ); 
};

const List = ({data, dispatch}) => {
  const listRef = useRef(null);
  const pages = Object.keys(routes).slice(2);

  const pageHash = { }; 
  pages.forEach(element => {
    const tmp = element.slice(1); 
    const pageTitle = tmp.toUpperCase();

    pageHash[element] = pageTitle;
  });

  function onClick(e, page) {
    e.preventDefault(); 
    
    navigate(page); 
  };
  
  useEffect(() => {
    console.log('Use effect triggered'); 
    loadExpense({data: data, dispatch: dispatch}); 
    loadGallery({data: data, dispatch: dispatch});
  }, [data.account._id]); 

  return (
    <div className="d-flex flex-column align-items-center gap-2 vh-100" ref={listRef}>
      {Object.entries(pageHash).map(([page,title]) => (
        <button key={page} className="appChildrenBtn" onClick={(e) => onClick(e,page)}>{title}</button>
      ))}
    </div>
  ); 
}; 




// ========================== PAGE =======================================
const HomePage = () => {
  const { data, dispatch } = useContext(StateContext); 

  return (
    <>
      <h2 className="header" style={{fontStyle:'italic'}}>{data.account.user}'s SUITCASE</h2>
      <Button />
      <List data={data} dispatch={dispatch}/>
    </>
  ); 
};

export default HomePage; 
