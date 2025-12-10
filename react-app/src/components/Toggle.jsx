const buttonStyle = {

}; 

const toggleStyle = {

};

const Toggle = ({option1, option2, onClick1, onClick2}) => {
  return (
    <div style={buttonStyle}>
      <button style={toggleStyle} onClick={onClick1}>{option1}</button>
      <button style={toggleStyle} onClick={onClick2}>{option2}</button>
    </div>
  ); 
}; 
