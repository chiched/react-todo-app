import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faPlus,
  faTrashAlt,
  faStar,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const TodoItem = (props) => {
  const { todo, index, id } = props;
  return (
    <li>
      <input
        onChange={(event) => props.toggleTodoDone(event, index, id)}
        type="checkbox"
        checked={todo.done}
      />
      {/* <span
            style={{
              textDecoration: todo.done ? "line-through" : "inherit",
            }}
          >
            {todo.title}
          </span> */}
      <span className={todo.done ? "done" : ""}>{todo.title}</span>
      <span
        onClick={(event) => props.toggleTodoImportant(event, index, id)}
        className={todo.important ? "important" : ""}
      >
        <FontAwesomeIcon icon={faStar} className="star" />
      </span>

      <button onClick={() => props.removeTodo(index, id)}>Remove</button>
    </li>
  );
};

export default TodoItem;
