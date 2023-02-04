export type FilterButtonProps = {
  name: string;
  isPressed: boolean;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

function FilterButton(props: FilterButtonProps) {
  function handleBtnClick() {
    props.setFilter(props.name);
  }

  return (
    <button
      type='button'
      className='btn toggle-btn'
      onClick={handleBtnClick}
      aria-pressed={props.isPressed}
    >
      <span className='visually-hidden'>Show </span>
      <span>{props.name}</span>
      <span className='visually-hidden'> tasks</span>
    </button>
  );
}

export default FilterButton;
