function CheckListItem({
  todovalue,
  todotext,
  todostatus,
  handleCheckboxClick,
}) {
  return (
    <>
      {" "}
      <input
        type="checkbox"
        checked={todostatus}
        id={todovalue}
        name={todovalue}
        value={todovalue}
        onChange={() => handleCheckboxClick(todovalue)}
      />
      <label htmlFor="vehicle1">{todotext}</label>
      <br />
    </>
  );
}

export default CheckListItem;
