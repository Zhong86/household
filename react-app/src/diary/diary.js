import { useRef, useImperativeHandle, useState, useEffect } from 'react'; 
import { state } from '../index.js'; 

const ListEntries = () => {
  const [entries, setEntries] = useState(state.account?.diary?.entries || []); 
  const [grid, isGrid] = useState(false); 
  
  useEffect(() => {
    if (state.account.diary.entries) {
      setEntries(state.account.diary.entires); 
    }
  }, []); 

  
}; 

const CreateEntry = ({onSuccess, ref }) => {
  const formRef = useRef(null); 
  const closeRef = useRef(null); 
  const [isVisible, setVisibility] = useState(false); 

  useImperativeHandle(ref, () => ({
    show: () => setVisibility(true),
    hide: () => setVisibility(false) 
  })); 

  const close = () => {
    setVisibility(false); 
  };

  const onSubmit = (e) => {

  };

  return (
    <>
      <button className="createEntry-diary" type="submit">Create Entry</button>

      <div className="createEnryBloc-diary" style={{display: isVisible ? 'block' : 'none'}}>
        <button ref={closeRef} className="close-diary" onClick={close} type="button">X</button>
        <h2 className="diary" style={{fontSize:"30px"}}>Create New Diary Entry</h2>
        <div className="createInner-diary">
          <form ref={formRef} className="newEntry-diary" onSubmit={onSubmit} method="POST">
            <div className="form-group-diary">
              <label forHtml="title">Title</label> <br />
              <input id="title" name="title" type="text" required />
            </div>
            <div className="form-group-diary">
              <label forHtml="img">Image</label> <br />
              <input id="img" name="img" type="text" required />
            </div>
            <div className="form-group-diary">
              <label forHtml="story">Story</label> <br />
              <input id="story" name="story" type="text" required />
            </div>
          </form>
        </div>
      </div>
    </>
  ); 
};

const Sort = () => {
  
  return (
    <div className="split-diary">
      <div style={{width:"30%"}}>
        <label for="sort" style={{color:"white"}}>Sort</label> <br />
        <select name="sort" id="sort">
          <option value="title">Title</option>
          <option value="date">Date Created</option>
        </select>
      </div>
      <div style={{width:"35%"}} />
      <div className="btn-group-diary">
        <button className="toggleStyle-diary" type="button">List</button>
        <button className="toggleStyle-diary" type="buttton">Grid</button>
      </div>
    </div>
  ); 
};

export { CreateEntry, Sort };
