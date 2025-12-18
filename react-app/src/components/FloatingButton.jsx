const floatStyle = {
  position: "sticky", 
  top: "10px", 
  width: "150px", 
  zIndex: 99, 
  margin:"auto",
}; 

const btnStyle = {
  width: "150px", 
  height: "50px", 
  padding: "4px", 
  fontSize: "16px", 
  fontWeight: "bold", 
  color: 'white', 
  background: '#454545', 
  borderRadius: '8px'
}; 

const FloatingButton = ({text, onClick}) => (
  <div style={floatStyle}>
    <button style={btnStyle} onClick={onClick}>{text}</button>
  </div> 
); 

export default FloatingButton; 
