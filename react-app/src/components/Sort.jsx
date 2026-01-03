const Sort = ({options}) => {
  return (
    <div className='mb-3'>
      <select className="form-select" >
        <option selected>Sort Options</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  ); 
};

export default Sort; 
