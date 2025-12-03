import './Home.css'; 
import { Button, List } from './home.js';  

const HomePage = (props) => (
  <section>
    <h2 id="title">{props.name}'s Home</h2>
    <Button />
    <List />

  </section>
);

export default HomePage; 
