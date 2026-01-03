const profileStyle = {
  position:"absolute", 
  top: "32px", 
  right: "32px",
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
