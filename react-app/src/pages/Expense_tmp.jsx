import { serverPort, navigate } from '../index.js'; 
import { createExpense, createTrans, deleteTrans } from '../api/expenseFetch'; 
import { useRef, useState, useEffect, useContext } from 'react'; 
import { StateContext } from '../context/AppContext'; 
import Table from '../components/Table'; 
import FloatingContainer from '../components/FloatingContainer'; 
import FloatingButton from '../components/FloatingButton'; 

const info = ['date', 'object', 'price', 'location']; 

export default const ExpensePage = () => {
  const { data, dispatch } = useContext(StateContext); 
  
  return (
    <>
      {
        data.expense === {} 
          ? <NewUser /> 
          : <MainPage expense={data.expense} dispatch={dispatch}/> 
      }
    </>
  ); 
}; 

const MainPage = ({expense, dispatch}) => {
  const [isCreating, setCreating] = useState(false); 
  const [filter, setFilter] = useState({}); 

  return (
    <>
      <section className="balance">
        Balance <br /> 
        <span>{expense.currency}</span> <span>{expense.balance}</span>
      </section>
      <h2>{expense.description}</h2>
      <FloatingButton text="Add Transaction" onClick={setCreating(true)} /> 
      { isCreating && <TransactionBloc close={setCreating(false)}/> }
      <Filter setFilter={setFilter}/>
      <TransactionTable transactions={expense.transactions} filter={filter} dispatch={dispatch}/>
    </>
  ); 
}; 

const TransactionTable = ({transactions, filter, dispatch}) => {
  const [error, setError] = useState(''); 

  const filteredTrans = useEffect(() => {
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
  }, [transactions, filter]); 

  async function onDelete(e, id) {
    e.preventDefault(); 
    try {
      const result = await deleteTrans(id); 

      dispatch({
        type: 'setExpense', 
        expense: result
      }); 
    } catch (error) {
      setError(error.message); 
    }
  }

  return (
    {
      !error ? <Table headers={info} list={filteredTrans} onDelete={onDelete} /> 
        : <div role='alert'>{error}</div>
    }
  ); 
};

const TransactionBloc = ({ close }) => {
  const { data, dispatch } = useContext(StateContext); 
  const [error, setError] = useState(''); 
  const [submitting, setSubmitting] = useState(false); 
  const formRef = useRef(null); 

  async function createTransaction(e) {
    e.preventDefault(); 
    if(!formRef.current) return; 

    const form = formRef.current; 
    setSubmitting(true); 
    try {
      const formData = new FormData(form); 
      const value = new Object.fromEntries(formData); 

      const result = await createTrans(data.expense, value); 
      if (result.error) {
        setError(result.error); 
        setSubmitting(false);
        return; 
      }

      dispatch({
        type: 'setExpense',
        expense: result
      }); 

      form.reset(); 
      setSubmitting(false); 
      setError(''); 
      close(); 
    } catch (err) {
      setError(err.message); 
      setSubmitting(false); 
    }
  }

  return (
    <FloatingContainer isVisible={isVisible} close={close} text="Create New Transaction">
      <form ref={formRef} className="floating-form" onSubmit={createTransaction} method="POST">
        <div className="formGroup">
          <label htmlFor="date">Date</label> <br />
          <input type="date" name="date" id="date"required />
        </div>
        <div className="formGroup">
          <label htmlFor="object">Object</label> <br />
          <input type="text" name="object" maxLength="100" id="object" required />
        </div>
        <div className="formGroup">
          <label htmlFor="price">Price</label> <br/>
          <input type="number" name="price" step="0.01" id="price"required />
        </div>
        <div className="formGroup">
          <label htmlFor="location">Location (Optional)</label> <br />
          <input type="text" name="location" maxLength="100" id="location"/>
        </div>
        <div role="alert">{error}</div>
        <button type="submit" className="submitForm">Create</button>
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
    setFilters({}); 
    formRef.current.reset(); 
  }

  return (
    <form ref={formRef} className="search" onSubmit={search} >
      <div style={{width: "350px", marginTop:"8px"}}>
        <div style={{display:"flex", gap:"8px", width:"100%"}}>
          <label htmlFor="date-form">
            Date from <br />
            <input type="date" id="date-from" name="dateFrom"/>
          </label>
          <label htmlFor="date-to">
            Date to <br />
            <input type="date" id="date-to" name="dateTo"/>
          </label>
        </div>
        <div style={{display:"flex", gap:"8px", width:"100%"}}>
          <label htmlFor="price-min">
            Min price <br />
            <input type="number" step="0.01" id="price-min" name="priceMin"/>
          </label>
          <label htmlFor="price-max">
            Max price <br />
            <input type="number" step="0.01" id="price-max" name="priceMax"/>
          </label>
        </div>
        <label htmlFor="search-description">
          Description <br />
        </label> <br />
        <input type="text" id="search-description" name="searchDescription" />
        <div style={{flexBasis: "100%", display:"flex", gap:"8px", alignItems:"flex-end"}}>
          <button type="submitForm">Search</button>
          <button onClick={reset}>Clear Filters</button>
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

  const createExpense = async (e) => {
    e.preventDefault(); 
    if(!formRef.current) return; 

    const form = formRef.current; 
    setSubmitting(true); 
    try {
      const formData = new FormData(form); 
      const value = Object.fromEntries(formData); 
      const expense = {
        currency: value.currency, 
        description: value.description, 
        balance: parseFloat(value.balance).toFixed(2), 
      }; 

      const result = await createExpense(data.user, expense); 

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
      setSubmitting(false); 
      setError(''); 
    } catch (error) {
      setError(error.message); 
      setSubmitting(false); 
    }
  }

  return (
    <>
      <h1>Welcome to the Expense Page</h1>
      <div className="container">
        <h2>Create Your Expense Data</h2>
        <form ref={formRef} onSubmit={createExpense}>
          <label htmlFor="currency">Currency</label> <br />
          <input type="text" id="currency" name="currency" className="formField" pattern="(Rp||$)" required/> <br />
          <label htmlFor="desc" >Description </label> <br />
          <input type="text" id="desc" className="formField" name="description" required/> <br />
          <label htmlFor="balance" >Balance </label> <br />
          <input type="number" id="balance" className="formField" name="balance" required/> <br />
          <div role="alert">{error}</div>
          <button type="submit" className="submitForm" disabled={submitting}>Enter Expense Page</button>
        </form>
      </div>
    </>
  ); 
}; 
