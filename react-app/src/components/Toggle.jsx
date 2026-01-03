const Toggle = ({active, option1, option2, onClick1, onClick2}) => {
  return (
    <div className='d-flex gap-2'>
      <button className={`btn border border-3 border-secondary flex-fill
${active ? 'btn-secondary active' : 'btn-outline-secondary text-white'}`}
        onClick={onClick1}>{option1}</button>
      <button className={`btn border border-3 border-secondary flex-fill
${!active ? 'btn-secondary active' : 'btn-outline-secondary text-white'}`} onClick={onClick2}>{option2}</button>
    </div>
  ); 
}; 

export default Toggle; 
