import { useState } from 'react';

type FormProps = {
  onSubmit: (name: string) => void;
};

function Form(props: FormProps) {
  const [name, setName] = useState('');

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    props.onSubmit(name);
    setName('');
  }

  function handleInputChange(e: React.ChangeEvent) {
    const elem = e.target as HTMLInputElement;
    setName(elem.value);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2 className='label-wrapper'>
        <label htmlFor='new-todo-input' className='label__lg'>
          What needs to be done?
        </label>
      </h2>
      <input
        type='text'
        id='new-todo-input'
        className='input input__lg'
        name='text'
        autoComplete='off'
        value={name}
        onChange={handleInputChange}
      />
      <button type='submit' className='btn btn__primary btn__lg'>
        Add
      </button>
    </form>
  );
}

export default Form;
