import {
  addTodo,
  removeTodo,
  doTodo,
  inCompelte,
  AllTodo,
  completed,
} from "../Redux/action.js";

function addTodoAction(title) {
  return {
    type: addTodo,
    title,
  };
}
function removeTodoAction(id) {
  return {
    type: removeTodo,
    id,
  };
}

function doTodoAction(id) {
  return {
    type: doTodo,
    id,
  };
}
function filterIncomplete() {
  return {
    type: inCompelte,
  };
}
function filterAllTodo() {
  return {
    type: AllTodo,
  };
}
function filterCompeleted() {
  return {
    type: completed,
  };
}

export {
  addTodoAction,
  removeTodoAction,
  doTodoAction,
  filterIncomplete,
  filterAllTodo,
  filterCompeleted,
};
