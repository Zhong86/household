const Sort = ({options}) => {
  return (
    <div style={{width:"30%"}}>
      <label htmlFor="sort" style={{color:"white"}}>Sort</label> <br />
      <select name="sort" id="sort">
        {options.map(([value, text]) => (
          <option key={value} value={value}>{text}</option>
        ))}
      </select>
    </div>
  ); 
};

export default Sort; 
