const closeBtnStyle = {
  position: "relative", 
  width: "30px", 
  height: "30px", 
  background: "rgba(0,0,0,0)",
  border: "none", 
  color: "black", 
  textAlign: "center", 
  display: "inline-block", 
  borderRadius: "50%", 
  fontSize: "20px", 
  left: "45", 
  top:"10px", 
  padding: "2px", 
}; 

const innerBodyStyle = {
  width: "90%", 
  height: "80%", 
  margin:"auto", 
  marginTop: "20px", 
  borderRadius: "8px", 
};

const FloatingContainer = ({ isVisible, buttonRef, close, text, children}) => {
  return (
    <div className="floatingContainer" style={{display: isVisible ? 'block' : 'none'}}>
      <button ref={buttonRef} style={closeBtnStyle} onClick={close} type="button" >X</button>
      <h2  style={{fontSize:"30px"}}>{text}</h2>
      <div style={innerBodyStyle}>
        {children}
      </div>
    </div>
  ); 
};

export default FloatingContainer; 
