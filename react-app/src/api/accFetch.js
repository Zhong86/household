export async function createAcc(acc) {
  const url = process.env.REACT_APP_SERVER_PORT + '/accounts'; 
  try {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      }, 
      body: acc
    });
    return await response.json(); 
  } catch (error) {
    return { error: error.message || 'Network error occured' }; 
  }
}

export async function getAcc(acc) {
  const url = process.env.SERVER_PORT + '/accounts'; 
  try {
    const response = await fetch(url + encodeURIComponent(acc.user), 
      {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(acc)
      }); 
    return await response.json(); 
  } catch (error) {
    return { error: error.message || 'Get user error' }; 
  }
}
