import React from "react";

const NewTodoForm = (props) => {
  return (
    <form className="add-todo" onSubmit={props.formSubmitted}>
      new todo
      <input
        onChange={props.newTodoChanged}
        id="newTodo"
        name="newTodo"
        value={props.newTodo}
      />
      <button type="submit">+</button>
    </form>
  );
};

export default NewTodoForm;
