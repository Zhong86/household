const btnStyle={

};

const deleteBtnStyle={

}; 

const ListButton = ({entryData, openEntry, deleteEntry} style={btnStyle}) => {
  return (
    <button onClick={openEntry(entryData._id}>
      {/* Title */}
      <div>
        
      </div>
      
      {/* Date Updated */}

      <button onClick={deleteEntry(entryData._id)} style={deleteBtnStyle}>Delete</button>
    </button>
  ); 
}; 

export default ListButton; 
