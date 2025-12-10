import { routes, navigate } from '../index.js'; 
import { useRef } from 'react'; 
import Profile from '../components/Profile';

const Button = () => {
  const btnRef = useRef(null); 

  const handleClick = (e) => {
    e.preventDefault(); 
    if (btnRef.current) {
      
    }
    console.log('Opened profile'); 
  };

  return (
    <Profile />
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
  
  return (
    <div className="appsList" ref={listRef}>
      {Object.entries(pageHash).map(([page,title]) => (
        <button key={page} className="appChildrenBtn" onClick={(e) => onClick(e,page)}>{title}</button>
      ))}
    </div>
  ); 
}; 




// ========================== PAGE =======================================
const HomePage = (props) => (
  <section>
    <h2 id="title">{props.name}'s Home</h2>
    <Button />
    <List />

  </section>
);

export default HomePage; 
