const profileStyle = {
  position:"absolute", 
  top: "10%", 
  right: "10%",
};

const btnStyle = {
  width: "75px", 
  height: "75px", 
  borderRadius: "50%", 
  border: "2px ", 
  backgroundColor: "green",
}; 

const Profile = ({handleClick}) => (
  <div style={profileStyle}>
    <button type="button" style={btnStyle}
      onClick={handleClick}></button>
  </div>
); 

export default Profile; 
