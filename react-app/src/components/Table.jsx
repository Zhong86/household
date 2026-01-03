const tableStyle = {
  width: "600px", 
  margin:"auto",
  marginTop: "20px", 
};

const theadStyle = {
  textAlign: "left", 
  padding: "4px", 
}; 

const dltStyle = {
  textAlign: 'center', 
}; 

const TData = ({keyTmp, value, index }) =>  {
  return (
    <td key={keyTmp}>
      {keyTmp === "price" ? value.toFixed(2) : value}
    </td>
  ); 
}; 

const Table = ({headers, list, onDelete}) => {
  const thead = headers.map(h => h.charAt(0).toUpperCase() + h.slice(1));
  thead.push('Delete'); 

  return (
    <table className="table table-striped table-bordered table-hover" style={tableStyle}>
      <thead style={theadStyle}>
        <tr>{thead.map((head, i) => <th scope='col' key={`${i}-${head}`}>{head}</th>)}</tr>
      </thead>
      <tbody>
        {list && list.map((child, i) => {
          const id = child._id; 

          return (
            <tr key={id}>
              {headers.map(h => (
                <TData keyTmp={`${id}-${h}`} value={child[h]} index={i}/>
              ))}
              {onDelete && 
                (<td key={`${id}-dlt`} style={dltStyle}>
                <button className='btn btn-danger' onClick={(e) => onDelete(e,id)}>Delete</button>
              </td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  ); 
}; 

export default Table; 
