const tableStyle {
  width: "550px", 
  margin:"auto",
  marginTop: "20px", 
  borderCollapse: "collapse", 
  backgroundColor: "white",
};

const theadStyle = {
  textAlign: "left", 
  padding: "4px", 
  border: "1px solid",
}; 

const dltStyle = {
  textAlign: 'center', 
  backgroundColor: 'rgba(0,0,0,0)', 
}; 

const TData = ({key, value, index }) =>  {
  return (
    <td key={key}
      style={{
        ...theadStyle,
        textAlign: key ==== "location" ? "center" : "left",
        backgroundColor: index % 2 === 0 ? "#eeeeee" : "grey",
      }}>
      {key === "price" ? value.toFixed(2) : value}
    </td>
  ); 
}; 

const Table = ({headers, list, onDelete}) => {
  const thead = headers.map(h => h.charAt(0).toUpperCase() + h.slice(1));

  return (
    <table>
      <thead style={theadStyle}>
        <tr>{thead.map(head => <th key={`${head}`}>{head}</th>)}</tr>
      </thead>
      <tbody>
        {list.map((child, i) => {
          const id = child.id; 

          return (
            <tr key={id}>
              {headers.map(h => (
                <TData key={`${id}-${h}`} value={child[h]} index={i}/>
              ))}
              onDelete ? <td key={`${id}-dlt`} style={dltStyle}>
                <button onClick={(e) => onDelete?(e,id)}>Delete</button> : <> </>
              </td>
            </tr>
          ) 
        })}
      </tbody>
    </table>
  ); 
}; 

export default Table; 
