import './Expense.css'; 
import { NewUser, AddTransaction, FilterTable } from './expense.js';
import { state } from '../index.js'; 

const ExpensePage = () => {
  const expense = state.account.expense; 
  if(Object.keys(expense).length === 0) {
    return <NewUser />
  } else {
    return <MainPage />
  }
}; 

const MainPage = () => {
  const expense = state.account.expense;

  return (
    <>
      <section className="balance-expense">
        Balance <br /> <span>{expense.currency}</span><span>{expense.balance}</span> 
      </section>
      <h2 className="description-expense">{expense.description}</h2> <br/>
      <AddTransaction />
      <FilterTable />
    </>
  );
};

export default ExpensePage; 
