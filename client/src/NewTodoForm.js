import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
const NewTodoForm = (props) => {
  return (
    <form className="add-todo" onSubmit={props.formSubmitted}>
      <input
        onChange={props.newTodoChanged}
        id="newTodo"
        name="newTodo"
        value={props.newTodo}
        placeholder="Add a new to-do"
        autoComplete="off"
      />
      <button type="submit">
        <FontAwesomeIcon className="logout" icon={faPlusCircle} size="lg" />
      </button>
    </form>
  );
};

export default NewTodoForm;
