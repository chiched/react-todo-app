import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faStar as fsStar,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

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
      <div className="todo-right">
        <span
          onClick={(event) => props.toggleTodoImportant(event, index, id)}
          className={todo.important ? "important" : ""}
        >
          <FontAwesomeIcon
            icon={faStar}
            className={todo.important ? "visible" : "hidden"}
            size="lg"
          />
          <FontAwesomeIcon
            icon={fsStar}
            className={todo.important ? "hidden" : "visible"}
            size="lg"
          />
        </span>

        <a href="" onClick={() => props.removeTodo(index, id)}>
          <FontAwesomeIcon icon={faTrashAlt} size="lg" />
        </a>
      </div>
    </li>
  );
};

export default TodoItem;
