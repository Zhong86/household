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
      <h1 style={{textAlign: 'center'}}>{`${data.account.user}'s ${data.gallery.description}`}</h1>
      <FloatingButton text="Create Entry" onClick={() => setCreating(true)}/>
      { creating &&  <EntryBloc data={data} dispatch={dispatch} close={()=>setCreating(false)}/>}
      <div className="row justify-content-center mt-4 gap-5">
        <div className="col-4 ">
          <Sort options={sortOptions}/>
        </div>
        <div className='col-3 '>
          <Toggle active={listForm}
            option1="List" option2="Grid"
            onClick1={()=>setList(true)} onClick2={()=>setList(false)}
          />
        </div>
      </div>
      <div className='row justify-content-center gy-2'>
        <ListEntries data={data}/>
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

    if (!form.checkValidity()) {
      form.classList.add('was-validated'); 
      return; 
    }

    setSubmitting(true); 
    try {
      const formData = new FormData(form); 
      
      const result = await createEntry(data.gallery.userId, formData); 
      if (result.error) {
        setError(result.error); 
        return; 
      }

      dispatch({
        type: 'setGallery', 
        gallery: result
      }); 

      form.reset(); 
      setError(''); 
      close(); 
    } catch (error) {
      setError(error.message); 
    } finally {
      setSubmitting(false); 
      form.classList.remove('was-validated'); 
    }
  }; 

  return (
    <FloatingContainer text='Create New Entry' close={close}>
      <form ref={formRef} onSubmit={onCreateEntry} method="POST" noValidate>
        <div className="mb-2">
          <label htmlFor="title">Title</label> <br />
          <input id="title" name="title" type="text" className='form-control' required />
        </div>
        <div className="mb-2">
          <label forHtml="img">Image</label> <br />
          <input id="img" name="img" type="file" className='form-control' required />
        </div>
        <div className="mb-4">
          <label forHtml="story">Story</label> <br />
          <textarea id="story" name="story" row="3" className='form-control' required />
        </div>
        <div className='d-flex justify-content-center'>
          <button type="submit" className="btn btn-primary btn-lg">Create Entry</button>
        </div>
        { error !== '' &&
          <div className='alert alert-danger' role='alert'>{error}</div> }
      </form>
    </FloatingContainer>
  );
}; 

const ListEntries = ({data}) => {
  const [grid, setGrid] = useState(false); 
  const [chosenId, setId] = useState(null); 
  const entries = data.gallery.entries; 

  const openEntry = async (e, id) => {
    e.preventDefault(); 
    setId(id); 
  }; 
  
  const selectedEntry = chosenId !== null
    ? entries.find(entry => entry._id === chosenId)
    : null; 
  console.log(selectedEntry); 

  return (
    <>
      { entries && entries.map(entry => (
        <div key={entry._id} className='col-8'>
          <button key={entry._id} className='btn btn-secondary w-100' onClick={(e) => openEntry(e, entry._id)}>
            {entry.title}
          </button>
        </div>
      ))}
      { chosenId !== null && 
        <FloatingContainer text={selectedEntry.title} close={() => setId(null)}> 
          
        </FloatingContainer>
      }
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
