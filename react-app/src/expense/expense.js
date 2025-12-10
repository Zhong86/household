import { serverPort, state, updateState, navigate } from '../index.js'; 
import { useRef, forwardRef, useImperativeHandle, useState, useMemo, useEffect, useCallback } from 'react';

const thead = ['Date', 'Object', 'Price', 'Location']; 

const Table = ({ transactions, filters, onDelete }) => {
  const filteredTrans = useMemo(() => {
    if(!filters || Object.keys(filters).length === 0) {
      return transactions.slice(); 
    }

    return transactions.filter(transaction => {
      //date filter
      if (filters.fromDate && new Date(transaction.date) < new Date(filters.fromDate)) return false; 
      if (filters.toDate && new Date(transaction.date) > new Date(filters.toDate)) return false; 
      //price filter
      if(filters.priceMin != null && transaction.price < parseFloat(filters.priceMin)) return false; 
      if(filters.priceMax != null && transaction.price > parseFloat(filters.priceMax)) return false; 
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

  const deleteTrans = async (e, id) => {
    e.preventDefault(); 
    
    const response = await fetch(serverPort +`/accounts/${state.account.user}/expense/transactions/${id}`, 
      { 
        method: 'DELETE' , 
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
      }); 
    if (!response.ok) {
      return console.error('Delete transaction error'); 
    } else {
      onDelete(id); 
    }
    const updatedAcc = await response.json(); 
    if(updatedAcc)
      updateState('account', updatedAcc); 

  };

  return (
    <table>
      <thead>
        <tr>{thead.map(head => <th key={`${head}`}>{head}</th>)}</tr>
      </thead>
      <tbody >
        {filteredTrans.map(transaction => (
          <tr key={transaction.id}>
            <td key={`${transaction.id}-date`}>{transaction.date}</td>
            <td key={`${transaction.id}-object`}>{transaction.object}</td>
            <td key={`${transaction.id}-price`}>{transaction.price.toFixed(2)}</td>
            <td key={`${transaction.id}-loc`} style={{textAlign:"center"}}>{transaction.location}</td>
            <td key={`${transaction.id}-dlt`} className="dltCell-expense">
              <button onClick={(e) => deleteTrans(e,transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ); 
}; 


// ============================== CREATE TRANSACTION ==============================
async function createTrans(transaction) {
  try {
    const name = state.account.user; 
    const response = await fetch(serverPort + `/accounts/${name}/expense/transactions`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(transaction)
    }); 

    if(!response.ok) {
      console.error('Error in creating new transaction'); 
    }

    return response; 
  } catch (error) {
    console.error('Error in createTransaction: ', error); 
  }
}

const TransactionBloc = forwardRef(({ onSuccess }, ref) => {
  const closeRef = useRef(null); 
  const formRef = useRef(null); 
  const [isVisible, setIsVisible] = useState(false); 

  //allow parent to use func
  useImperativeHandle(ref, () => ({
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false), 
  })); 

  const close = () => {
    setIsVisible(false); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(formRef.current) {
      const form = formRef.current; 
      const formBtn = form.querySelector('button[type="submit"]');

      try {
        formBtn.disabled = true; 
        formBtn.textContent = 'Creating...'; 

        const formData = new FormData(form); 
        const data = Object.fromEntries(formData); 

        const result = await createTrans(data); 
        if (result.ok) {
          const acc = await result.json(); 
          updateState('account', acc); 
          form.reset(); 
          onSuccess(); 
          close(); 
        }
        return;
      } catch (error) {
        console.error('Error in creating new expense: ', error); 
      } finally {
        formBtn.disabled = false; 
        formBtn.textContent = 'Create'; 
      }
    }
  }; 

  return (
    <div className="createTransaction-expense" style={{display: isVisible ? 'block' : 'none'}}>
      <button ref={closeRef} className="close-expense" onClick={close} type="button" >X</button>
      <h2 className="expense" style={{fontSize:"30px"}}>Create New Transaction </h2>
      <div className="createInner-expense">
        <form ref={formRef} className="newTransaction-expense" onSubmit={handleSubmit} method="POST">
          <div className="form-group-expense">
            <label htmlFor="date">Date</label> <br />
            <input type="date" name="date" id="date"required />
          </div>
          <div className="form-group-expense">
            <label htmlFor="object">Object</label> <br />
            <input type="text" name="object" maxLength="100" id="object" required />
          </div>
          <div className="form-group-expense">
            <label htmlFor="price">Price</label> <br/>
            <input type="number" name="price" step="0.01" id="price"required />
          </div>
          <div className="form-group-expense">
            <label htmlFor="location">Location (Optional)</label> <br />
            <input type="text" name="location" maxLength="100" id="location"/>
          </div>
          <button type="submit" className="create-expense">Create</button>
        </form>
      </div>
    </div>
  ); 
});

// ================================ FILTER SEARCH ==============================
const FilterTable = () => {
  const formRef = useRef(null); 
  const blocRef = useRef(null); 
  const [currentFilters, setCurrentFilters] = useState({}); 
  const [transactions, setTransactions] = useState(state.account?.expense?.transactions || []);

  useEffect(() => {
    if (state.account.expense.transactions) {
      setTransactions(state.account.expense.transactions); 
    }
  }, []); 

  const search = (e) => {
    e.preventDefault(); 
    if(formRef.current) {
      const form = formRef.current; 
      const formData = new FormData(form);
      const filters = Object.fromEntries(formData); 
      setCurrentFilters(filters); //store the filters in state
    }
  }; 
  const handleDelete = (id) => setTransactions(t => t.filter(tx => tx.id !== id));

// ================= ADD Transaction ===============
  const handleClick = (e) => {
    e.preventDefault(); 
    if (formRef.current) {
      const form = formRef.current; 
      form.reset(); 
    }
  }; 
  const handleShow = () => {
    blocRef.current?.show(); 
  }
  const onSuccess = useCallback(() => {
    if (state.account?.expense.transactions) {
      setTransactions(state.account?.expense.transactions); 
    }
  }, []); 


  return (
    <>
      <div className="floating-expense">
        <button className="transaction-expense" onClick={handleShow}>Add Transaction</button>
      </div>
      <TransactionBloc ref={blocRef} onSuccess={onSuccess}/>
      <form ref={formRef} className="search-expense" onSubmit={search} >
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
            <button type="submit">Search</button>
            <button type="button" onClick={handleClick}>Clear Filters</button>
          </div>
        </div>
      </form>
      <Table transactions={transactions} filters={currentFilters} 
        onDelete={handleDelete}/>
    </>

  ); 
};


// ================================== NEW USER ===================================
const NewUser = () => {
  const formRef = useRef(null); 

  const createExpenseInfo = async (e) => {
    e.preventDefault(); 
    if(formRef.current) {
      const form = formRef.current; 
      const btn = form.querySelector('[type="submit"]'); 

      try {
        btn.disabled = true; 
        btn.textContent = 'Adding New Expense Data...';

        //Currency, Description, Balance, Transactions
        const account = state.account; 
        const formData = new FormData(form); 
        const data = Object.fromEntries(formData); 
        const expense = {
          currency: data.currency, 
          description: data.description, 
          balance: parseFloat(data.balance).toFixed(2), 
          transactions: []
        }; 

        try {
          const response = await fetch(serverPort + `/accounts/${account.user}/expense`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json', 

            },
            body: JSON.stringify(expense)
          }); 
          if(!response.ok) throw new Error('Failed to update expense');  

          const accData = await response.json(); 
          updateState('account', accData);

        } catch (error) {
          console.error('Server error (update expense): ', error); 
        }

        form.reset(); 
        navigate('/expense'); 
      } catch (err) {
        console.error('Adding expense data error: ', err); 
      } finally {
        btn.disabled = false; 
        btn.textContent = 'Enter Expense Page';
      }
    }
  }; 

  return (
    <>
      <h1 className="expense">Welcome to the Expense Page</h1>
      <div className="newUserContainer-expense">
        <h2 className="expense">Create Your Expense Data</h2>
        <form className="newUserForm-expense" ref={formRef} onSubmit={createExpenseInfo}>
          <label htmlFor="currency">Currency</label> <br />
          <input type="text" id="currency" name="currency" className="expense" pattern="(Rp||$)" required/> <br />
          <label htmlFor="desc" >Description </label> <br />
          <input type="text" id="desc" className="expense" name="description" required/> <br />
          <label htmlFor="balance" >Balance </label> <br />
          <input type="number" id="balance" className="expense" name="balance" required/> <br />
          <button type="submit">Enter Expense Page</button>
        </form>
      </div>
    </>
  ); 
}; 

export {NewUser, FilterTable };
