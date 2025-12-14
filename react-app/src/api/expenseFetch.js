export async function createExpense(userData, expenseData) {
  const url = `${process.env.REACT_APP_SERVER_PORT}/expense/${userData._id}`;
  try {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(expense)
    }); 
    return await response.json(); 
  } catch (error) {
    return { error: error.message }; 
  }
}

export async function createTrans(expenseData, transaction) {
  const url = `${process.env.REACT_APP_SERVER_PORT}/expense/${expenseData.userId}/transactions`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(transaction)
    }); 
    return await response.json(); 
  } catch (error) {
    return { error: error.message }; 
  }
}

export async function deleteTrans(expenseData, id) {
  const url = `${process.env.REACT_APP_SERVER_PORT}/expense/${expenseData.userId}/transactions/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE' , 
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      },
    });  
    return await response.json(); 
  } catch (error) {
    return { error: error.message }; 
  }
}
