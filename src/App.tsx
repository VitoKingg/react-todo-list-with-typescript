import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo';
import { usePrevious } from './utilities/HooksUtilities';

const TODO_DATA = [
  { id: 'todo-0', name: 'Eat', completed: true },
  { id: 'todo-1', name: 'Sleep', completed: false },
  { id: 'todo-2', name: 'Repeat', completed: false }
];

const FILTER_MAP = {
  All: () => true,
  Active: (task: any) => !task.completed,
  Completed: (task: any) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [tasks, setTasks] = useState(TODO_DATA);
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {
          ...task,
          completed: !task.completed
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function addTask(name: string) {
    const newTask = {
      id: `todo-${nanoid()}`,
      name,
      completed: false
    };
    setTasks([...tasks, newTask]);
  }

  function editTask(id: string, newName: string) {
    console.log(id, newName);
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }

      return task;
    });

    setTasks(editedTaskList);
  }

  function deleteTask(id: string) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter as keyof object])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      name={name}
      key={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const headingText = `${taskList.length} ${
    taskList.length > 1 ? 'tasks' : 'task'
  } remaining;`;

  const listHeadingRef = useRef<HTMLHeadingElement>(null!);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - (prevTaskLength as number) === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>
      <Form onSubmit={addTask} />
      <div className='filters btn-group stack-exception'>{filterList}</div>
      <h2 id='list-heading' tabIndex={-1} ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
