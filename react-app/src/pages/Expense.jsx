import { createExpense, createTrans, deleteTrans } from '../api/expenseFetch'; 
import { useRef, useState,useContext, useMemo} from 'react'; 
import { StateContext } from '../context/AppContext'; 
import Table from '../components/Table'; 
import FloatingContainer from '../components/FloatingContainer'; 
import FloatingButton from '../components/FloatingButton'; 

const info = ['date', 'object', 'price', 'location']; 

const ExpensePage = () => {
  const { data, dispatch } = useContext(StateContext); 
  
  if (data.expense === null) return <NewUser />; 
  else return <MainPage data={data} dispatch={dispatch}/>;
}; 

const MainPage = ({ data, dispatch}) => {
  const [isCreating, setCreating] = useState(false); 
  const [filter, setFilter] = useState({}); 

  return (
    <>
      <section className="balance">
        Balance <br /> 
        <span>{data.expense.currency}</span> <span>{data.expense.balance}</span>
      </section>
      <h2 style={{
        marginTop: '.5%', marginBottom: '2%'
      }}>{data.expense.description}</h2>
      <FloatingButton text="Add Transaction" onClick={() => setCreating(true)} /> 
      { isCreating && <TransactionBloc data={data} dispatch={dispatch} close={() => setCreating(false)}/> }
      <Filter setFilter={setFilter}/>
      <TransactionTable filters={filter} data={data} dispatch={dispatch}/>
    </>
  ); 
}; 

const TransactionTable = ({filters, data, dispatch}) => {
  const [error, setError] = useState(''); 
  const transactions = data.expense.transactions;

  const filteredTrans = useMemo(() => {
    if(transactions == null || transactions.length === 0) return; 
    if(!filters || Object.keys(filters).length === 0) {
      return transactions.slice(); 
    }

    return transactions.filter(transaction => {
      //date filter
      if (filters.fromDate && new Date(transaction.date) 
        < new Date(filters.fromDate)) return false; 
      if (filters.toDate && new Date(transaction.date) 
      > new Date(filters.toDate)) return false; 

      //price filter
      if(filters.priceMin != null && transaction.price 
        < parseFloat(filters.priceMin)) return false; 
      if(filters.priceMax != null && transaction.price 
      > parseFloat(filters.priceMax)) return false; 

      //description filter
      if(filters.searchDescription && filters.searchDescription.trim()) {
        const searchTerm = filters.searchDescription.toLowerCase(); 
        if (!transaction.object.toLowerCase().includes(searchTerm) && 
          !transaction.location.toLowerCase().includes(searchTerm)) {
          return false; 
        }
      }
      return true; 
    });
  }, [transactions, filters]); 

  async function onDelete(e, id) {
    e.preventDefault(); 
    try {
      const result = await deleteTrans(data.expense.userId, id); 
      if(result.error) {
        setError(error.message); 
        return; 
      }

      dispatch({
        type: 'setExpense', 
        expense: result
      }); 
    } catch (error) {
      setError(error.message); 
    }
  }

  return (
    !error ? (<Table headers={info} list={filteredTrans} onDelete={onDelete} />)
      : (<div role='alert'>{error}</div>)
  ); 
};

const TransactionBloc = ({ data, dispatch, close }) => {
  const [error, setError] = useState(''); 
  const [submitting, setSubmitting] = useState(false); 
  const formRef = useRef(null); 

  async function createTransaction(e) {
    e.preventDefault(); 
    if(!formRef.current) return; 
    const form = formRef.current; 

    if (!form.checkValidity()) {
      form.classList.add('was-validated'); 
      return; 
    }

    setSubmitting(true); 
    try {
      const formData = new FormData(form); 
      const value = Object.fromEntries(formData); 

      const result = await createTrans(data.expense.userId, value); 
      if (result.error) {
        setError(result.error); 
        return; 
      }

      dispatch({
        type: 'setExpense',
        expense: result
      }); 

      form.reset(); 
      setError(''); 
      close(); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setSubmitting(false); 
      form.classList.remove('was-validated'); 
    }
  }

  return (
    <FloatingContainer close={close} text="Create New Transaction">
      <form ref={formRef} className="floating-form" onSubmit={createTransaction} method="POST" noValidate>
        <div className="mb-2">
          <label htmlFor="date">Date</label> <br />
          <input type="date" name="date" id="date" className="form-control" required />
        </div>
        <div className="mb-2">
          <label htmlFor="object">Object</label> <br />
          <input className="form-control" type="text" name="object" maxLength="100" id="object" required />
        </div>
        <div className="mb-2">
          <label htmlFor="price">Price</label> <br/>
          <input className="form-control" type="number" name="price" step="0.01" id="price"required />
        </div>
        <div className="mb-2">
          <label htmlFor="location">Location (Optional)</label> <br />
          <input className="form-control" type="text" name="location" maxLength="100" id="location"/>
        </div>
        { error !== '' &&
          <div className="alert alert-danger" role="alert">{error}</div> }
        <div className="d-flex justify-content-center">
          <button type="submit" disabled={submitting} className="btn btn-secondary"
          >Create</button>
        </div>
      </form>
    </FloatingContainer>
  ); 
}; 

const Filter = ({setFilter}) => {
  const formRef = useRef(null); 

  function search(e) {
    e.preventDefault(); 
    if(!formRef.current) return; 

    const form = formRef.current; 
    const formData = new FormData(form); 
    const filters = Object.fromEntries(formData); 

    setFilter(filters); 
  }

  function reset(e) {
    e.preventDefault(); 
    if(!formRef.current) return; 
    setFilter({}); 
    formRef.current.reset(); 
  }

  return (
    <form ref={formRef} onSubmit={search} >
      <div className="row">
        <div className="col">
          <label htmlFor="date-form">Date from </label>  
          <input type="date" id="date-from" name="dateFrom" className="form-control"/>
        </div>
        <div className="col">
          <label htmlFor="date-to">Date to</label>
          <input type="date" id="date-to" name="dateTo" className="form-control"/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="price-min">Min price</label>
          <input type="number" step="0.01" id="price-min" name="priceMin" className="form-control"/>
        </div>
        <div className="col">
          <label htmlFor="price-max">Max price</label>
          <input type="number" step="0.01" id="price-max" name="priceMax" className="form-control"/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="search-description">Description</label>
          <input type="text" id="search-description" name="searchDescription" className="form-control"/>
        </div>
        <div className="col">
          <div className="row">
            <button type="submit">Search</button>
            <button onClick={reset}>Clear Filters</button>
          </div>
        </div>
      </div>
    </form>
  ); 
};

const NewUser = () => {
  const { data, dispatch } = useContext(StateContext); 
  const [error, setError] = useState(''); 
  const [submitting, setSubmitting] = useState(false); 
  const formRef = useRef(null); 

  const submitExpense = async (e) => {
    e.preventDefault(); 
    if(!formRef.current) return; 
    const form = formRef.current; 

    if (!form.checkValidity()) {
      form.classList.add('was-validated'); 
      return; 
    }

    setSubmitting(true); 
    try {
      const formData = new FormData(form); 
      const value = Object.fromEntries(formData); 
      const expense = {
        currency: value.currency, 
        description: value.description, 
        balance: parseFloat(value.balance).toFixed(2), 
      }; 

      const result = await createExpense(data.account._id, expense); 

      if(result.error) {
        setError(result.error); 
        setSubmitting(false); 
        return; 
      }

      dispatch({
        type: 'setExpense', 
        expense: result
      }); 

      form.reset(); 
      setError(''); 
    } catch (error) {
      setError(error.message); 
    } finally {
      setSubmitting(false); 
      form.classList.remove('was-validated'); 
    }
  }; 

  return (
    <>
      <h1>Welcome To Your Expense Page</h1>
      <div className="box">
        <h2>Create Your Expense Data</h2>
        <form ref={formRef} onSubmit={submitExpense} noValidate>
          <div className="mb-3">
            <label htmlFor="currency">Currency</label> 
            <input type="text" id="currency" name="currency" className="form-control" pattern="(Rp||$)" required/> <br />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" >Description </label> 
            <input type="text" id="desc" className="form-control" name="description" required/> <br />
          </div>
          <div className="mb-3">
            <label htmlFor="balance" >Balance </label> 
            <input type="number" id="balance" className="form-control" name="balance" required/> <br />
          </div>
          { error !== '' && 
            <div className="alert alert-danger" role="alert">{error}</div> }
          <div className="d-flex justify-content-center">
            <button type="submit" disabled={submitting}>Enter Expense Page</button>
          </div>
        </form>
      </div>
    </>
  ); 
}; 

export default ExpensePage; 
