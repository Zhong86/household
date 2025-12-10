const floatStyle = {
  position: "sticky", 
  top: "10px", 
  width: "150p", 
  z-index: "99", 
  margin:"auto",
}; 

const btnStyle = {
  width: "150p", 
  height: "50px", 
  padding: "4px", 
  fontSize: "16px", 
  fontWeight: "bold", 
}; 

const Floating_Button = ({text, onClick}) => {
  <div style={floatStyle}>
    <button style={btnStyle} onClick={onClick}>{text}</button>
  </div> 
}; 

export default Floating_Button; 
