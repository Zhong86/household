const closeBtnStyle = {
  position: "relative", 
  width: "30px", 
  height: "30px", 
  background: "none",
  color: "black", 
  textAlign: "center", 
  display: "inline-block", 
  borderRadius: "50%", 
  border: 'none', 
  fontSize: "20px", 
  top:"10px", 
  right: '2%',
  padding: "2px", 
}; 

const innerBodyStyle = {
  width: "90%", 
  height: "80%", 
  margin: 'auto', 
  marginTop: "20px", 
};

const FloatingContainer = ({ close, text, children}) => {
  return (
    <div className="floatingContainer">
      <button style={closeBtnStyle} onClick={close} type="button" >X</button>
      <h2  style={{fontSize:"30px"}}>{text}</h2>
      <div style={innerBodyStyle}>
        {children}
      </div>
    </div>
  ); 
};

export default FloatingContainer; 
