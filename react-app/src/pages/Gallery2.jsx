import { useref, useimperativehandle, usestate, useeffect } from 'react'; 
import { state } from '../index.js'; 
import Toggle from '../components/Toggle'; 
import Sort from '../components/Sort'; 
import Floating_Button from '../components/Floating_Button'; 
import Floating_Container from '../components/Floating_Container'; 

const ListEntries = () => {
  const [entries, setEntries] = useState(state.account?.diary?.entries || []); 
  const [grid, isGrid] = useState(false); 
  
  useEffect(() => {
    if (state.account.diary.entries) {
      setEntries(state.account.diary.entires); 
    }
  }, []); 
 
  //RETURN FUNC
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

  const handleShow = () => {
    
  };

  const onSubmit = (e) => {

  };

  return (
    <>
      <Floating_Button text={{"Create Entry"}}
        onClick={handleShow}/>
      <Floating_Container buttonRef={closeRef} close={close} text={{"Create New Expense"}}> 
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

      </Floating_Container>
    </>
  ); 
};

const DiaryPage = (props) => {
  return (
    <>
      <h1>{`${props.name}'s Diary`}</h1>
      <div className="split">
        <Sort options={sortOptions}/>
        <Toggle 
          option1={{"List"}} option2={{"Grid"}} 
          onClick1={showList} onClick2={showGrid}
        />
      </div>
    </>
  );
};

export default DiaryPage; 
