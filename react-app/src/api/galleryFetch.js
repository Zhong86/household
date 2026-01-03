export async function createGallery(userId, galleryData) {
  const url = `${process.env.REACT_APP_SERVER_PORT}/gallery/${userId}`;
  try {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(galleryData)
    }); 
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || `HTTP ${response.status}` };
    }
    return await response.json(); 
  } catch (error) {
    return { error: error.message }; 
  }
}

export async function getGallery(userId) {
  const url = `${process.env.REACT_APP_SERVER_PORT}/gallery/${userId}`;
  try {
    const response = await fetch(url, {
      method: 'GET'
    }); 
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || `HTTP ${response.status}` };
    }
    return await response.json(); 
  } catch (error) {
    return { error: error.message }; 
  }
}

export async function createEntry(userId, entry) {
  const url = `${process.env.REACT_APP_SERVER_PORT}/gallery/${userId}/entries`;
  try {
    const response = await fetch(url, {
      method: 'POST', 
      body: entry
    }); 
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || `HTTP ${response.status}` };
    }
    return await response.json(); 
  } catch (error) {
    return { error: error.message }; 
  }
}

async function editEntry(userId, entryId, entry) {
  const url = `${process.env.REACT_APP_SERVER_PORT}/gallery/${userId}/entry/${entryId}`;
  try {
    const response = await fetch(url, {
      method: 'PATCH', 
      body: JSON.stringify(entry)
    }); 
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || `HTTP ${response.status}` };
    }
    return await response.json(); 
  } catch (error) {
    return { error: error.message }; 
  }
}

export async function deleteEntry(userId, entryId) {
  const url = `${process.env.REACT_APP_SERVER_PORT}/gallery/${userId}/entry/${entryId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      }
    }); 
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || `HTTP ${response.status}` };
    }
    return await response.json(); 
  } catch (error) {
    return { error: error.message }; 
  }
}
