import ToDoList from '../components/ToDoList';

const Completed = () => {
  return (
    <div>
      <ToDoList filter="completed" />
    </div>
  );
};

export default Completed;