import ToDoList from '../components/ToDoList';

const Home = () => {
  return (
    <div>
      <ToDoList filter="all" />
    </div>
  );
};

export default Home;