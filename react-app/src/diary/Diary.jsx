import { CreateEntry, Sort } from './diary.js'; 

const DiaryPage = (props) => {
  return (
    <>
      <h1>{`${props.name}'s Diary`}</h1>
      <Sort />
    </>
  );
};

export default DiaryPage; 
