import { useState, useRef, useEffect } from 'react';
import { usePrevious } from '../utilities/HooksUtilities';

export type TodoProps = {
  name: string;
  completed: boolean;
  id: string;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newName: string) => void;
};

function Todo(props: TodoProps) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef<HTMLInputElement>(null!);
  const editButtonRef = useRef<HTMLButtonElement>(null!);

  const wasEditing = usePrevious(isEditing);

  function handleCheckboxClick() {
    props.toggleTaskCompleted(props.id);
  }

  function handleEditBtnClick() {
    setEditing(true);
  }

  function handleDeleteBtnClick() {
    props.deleteTask(props.id);
  }

  function handleTaskNameChange(e: React.ChangeEvent) {
    const elem = e.target as HTMLInputElement;
    setNewName(elem.value);
  }

  function handleCancelBtnClick(e: React.MouseEvent) {
    e.preventDefault();
    setEditing(false);
  }

  function handleSaveBtnClick(e: React.FormEvent) {
    e.preventDefault();

    if (!newName.trim()) {
      return;
    }

    props.editTask(props.id, newName);
    setNewName('');
    setEditing(false);
  }

  const editingTemplate = (
    <form className='stack-small' onSubmit={handleSaveBtnClick}>
      <div className='form-group'>
        <label className='todo-label' htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className='todo-text'
          type='text'
          value={newName || props.name}
          onChange={handleTaskNameChange}
          ref={editFieldRef}
        />
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn todo-cancel'
          onClick={handleCancelBtnClick}
        >
          Cancel
          <span className='visually-hidden'>renaming {props.name}</span>
        </button>
        <button type='submit' className='btn btn__primary todo-edit'>
          Save
          <span className='visually-hidden'>new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className='stack-small'>
      <div className='c-cb'>
        <input
          id={props.id}
          type='checkbox'
          defaultChecked={props.completed}
          onChange={handleCheckboxClick}
        />
        <label className='todo-label' htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn'
          onClick={handleEditBtnClick}
          ref={editButtonRef}
        >
          Edit <span className='visually-hidden'>{props.name}</span>
        </button>
        <button
          type='button'
          className='btn btn__danger'
          onClick={handleDeleteBtnClick}
        >
          Delete <span className='visually-hidden'>{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }

    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className='todo'>{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
