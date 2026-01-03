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
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || `HTTP ${response.status}` };
    }
    return await response.json(); 
  } catch (error) {
    return { error: error.message || 'Network error occured' }; 
  }
}

export async function getAcc(acc) {
  const url = process.env.REACT_APP_SERVER_PORT + '/login'; 
  try {
    const response = await fetch(url, 
      {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(acc)
      }); 
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || `HTTP ${response.status}` };
    }
    return await response.json(); 
  } catch (error) {
    return { error: error.message || 'Get user error' }; 
  }
}
