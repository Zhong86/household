import { useRef, useContext, useState } from 'react'; 
import { StateContext } from '../context/AppContext'; 
import { createGallery, createEntry } from '../api/galleryFetch'; 
import FloatingButton from '../components/FloatingButton'; 
import FloatingContainer from '../components/FloatingContainer'; 
import Sort from '../components/Sort'; 
import Toggle from '../components/Toggle'; 

const sortOptions = ['Name', 'Date Created'];

const GalleryPage = () => {
  const { data, dispatch } = useContext(StateContext); 
  if(data.gallery === null) return <NewUser />; 
  else return <MainPage data={data} dispatch={dispatch} />; 
}; 

const MainPage = ({data, dispatch}) => {
  const [creating, setCreating] = useState(false);
  const [listForm, setList] = useState(true); 

  return (
    <>
      <h1>{`${data.account.user}'s ${data.gallery.description}`}</h1>
      <FloatingButton text="Create Entry" onClick={() => setCreating(true)}/>
      { creating &&  <EntryBloc data={data} dispatch={dispatch} close={()=>setCreating(false)}/>}
      <div className="split">
        <Sort options={sortOptions}/>
        <Toggle 
          option1="List" option2="Grid"
          onClick1={()=>setList(true)} onClick2={()=>setList(false)}
        />
      </div>
    </>
  ); 
}; 

const EntryBloc = ({data, dispatch, close}) => {
  const [error, setError] = useState(''); 
  const [submitting, setSubmitting] = useState(false); 
  const formRef = useRef(null); 

  const onCreateEntry = async (e) => {
    e.preventDefault(); 
    if (!formRef.current) return; 

    const form = formRef.current; 
    setSubmitting(true); 
    try {
      const formData = new FormData(form); 
      const value = Object.fromEntries(formData); 

      const result = await createEntry(data.gallery.userId, value); 
      if (result.error) {
        setError(result.error); 
        setSubmitting(false); 
        return; 
      }
      
      dispatch({
        type: 'setGallery', 
        gallery: result
      }); 

      form.reset(); 
      setSubmitting(false); 
      setError(''); 
      close(); 
    } catch (error) {
      setError(error.message); 
      setSubmitting(false); 
    }
  }; 

  return (
    <FloatingContainer text='Create New Entry' close={close}>
      <form ref={formRef} onSubmit={onCreateEntry} method="POST">
        <div className="formGroup">
          <label forHtml="title">Title</label> <br />
          <input id="title" name="title" type="text" required />
        </div>
        <div className="formGroup">
          <label forHtml="img">Image</label> <br />
          <input id="img" name="img" type="file" required />
        </div>
        <div className="formGroup">
          <label forHtml="story">Story</label> <br />
          <input id="story" name="story" type="text" required />
        </div>
        <div role='alert'>{error}</div>
        <button type="submit" classForm="submitForm">Create Entry</button>
      </form>
    </FloatingContainer>
  );
}; 

const ListEntries = ({data}) => {
  const [grid, setGrid] = useState(false); 
  const entries = data.gallery.entries; 

  const openEntry = async (e) => {
    e.preventDefault(); 
  }; 

  return (
    <>
      { entries && entries.map(entry => (
        <button key={entry}  onClick={(e) => openEntry(e, entry.id)}>
          {entry.title}
        </button>
      ))}
    </>
  ); 
}; 
const NewUser = () => {
  const { data, dispatch } = useContext(StateContext); 
  const [error, setError] = useState(''); 
  const [submitting, setSubmitting] = useState(false); 
  const formRef = useRef(null); 

  const submitGallery = async (e) => {
    e.preventDefault(); 
    if(!formRef.current) return; 
    setSubmitting(true); 
    const form = formRef.current; 

    try {
      const formData = new FormData(form); 
      const value = Object.fromEntries(formData); 
      const gallery = {
        description: value.description
      }; 

      const result = await createGallery(data.account._id, gallery); 

      if(result.error) {
        setError(result.error); 
        setSubmitting(false); 
        return; 
      }

      dispatch({
        type: 'setGallery', 
        gallery: result
      }); 

      form.reset(); 
      setSubmitting(false); 
      setError(''); 
    } catch (error) {
      setError(error.message); 
      setSubmitting(false); 
    }
  }; 

  return (
    <>
      <h1>Welcome To Your Gallery Page</h1>
      <div className="container">
        <h2>Type in your title...</h2>
        <form ref={formRef} onSubmit={submitGallery}>
          <div className="formGroup">
            <label htmlFor="desc" >Description: </label> 
            <input type="text" id="desc" className="formField" name="description" required/> <br />
          </div>
          <div role="alert">{error}</div>
          <button type="submit" className="submitForm" disabled={submitting}>Enter Title</button>
        </form>
      </div>
    </>
  ); 
};
export default GalleryPage; 
