import { routes, navigate } from '../index.js'; 
import { useRef } from 'react'; 

const Button = () => {
  const btnRef = useRef(null); 

  const handleClick = (e) => {
    e.preventDefault(); 
    if (btnRef.current) {
      
    }
    console.log('Opened profile'); 
  };

  return (
    <div className="profile" ref={btnRef}>
      <button type="button" className="profileBtn" 
        onClick={handleClick}></button>
    </div>
  ); 
};

const List = () => {
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
  
  console.log(Object.entries(pageHash)); 
  return (
    <div className="apps" ref={listRef}>
      {Object.entries(pageHash).map(([page,title]) => (
        <button key={page} className="appChildrenBtn" onClick={(e) => onClick(e,page)}>{title}</button>
      ))}
    </div>
  ); 
}; 

export {
  Button, List
};
