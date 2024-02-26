import {
  addTodo,
  removeTodo,
  doTodo,
  completed,
  inCompelte,
  AllTodo,
} from "../Redux/action.js";

import {
  addTodoAction,
  removeTodoAction,
  doTodoAction,
  filterAllTodo,
  filterCompeleted,
  filterIncomplete,
} from "../Redux/actionCreators.js";

window.removeTodoHandler = removeTodoHandler;
window.doTodoHandler = doTodoHandler;

const todoInputElem = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".todo-button");
const todosContainer = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");
// create odoList Reducer

function todoListReducer(state = [], action) {
  switch (action.type) {
    case AllTodo: {
      return state;
    }
    case addTodo: {
      let newState = [...state];
      let newTodoObj = {
        id: crypto.randomUUID(),
        title: action.title,
        isCompleted: false,
      };
      newState.push(newTodoObj);
      return newState;
    }
    case removeTodo: {
      let copyState = [...state];
      let newState = copyState.filter((todo) => todo.id !== action.id);
      return newState;
    }
    case doTodo: {
      let copyState = [...state];
      copyState.some((todo) => {
        if (todo.id === action.id) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
    }
    default: {
      return state;
    }
  }
}
const store = Redux.createStore(todoListReducer);
console.log(store);

addTodoBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let newValue = todoInputElem.value.trim();
  store.dispatch(addTodoAction(newValue));
  const todos = store.getState();
  todoInputElem.value = "";
  generateTodosInDom(todos);
});
filterTodo.addEventListener("change", (e) => {
  store.dispatch(filterAllTodo())
  let todos = store.getState()
  if (e.target.value === "all") {
   generateTodosInDom(todos)
  } else if (e.target.value === "completed") {
    let  compeletedItems = todos.filter(i=> i.isCompleted)
    generateTodosInDom(compeletedItems)
  } else if (e.target.value === "incomplete") {
    let  inCompeletedItems = todos.filter(i=> !i.isCompleted)
    generateTodosInDom(inCompeletedItems)
  }

});

function removeTodoHandler(todoID) {
  store.dispatch(removeTodoAction(todoID));
  const todos = store.getState();
  generateTodosInDom(todos);
}

function doTodoHandler(todoID) {
  store.dispatch(doTodoAction(todoID));
  const todos = store.getState();
  generateTodosInDom(todos);
}

function generateTodosInDom(todos) {
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    todosContainer.insertAdjacentHTML(
      "beforeend",
      `
            <div class="todo ${todo.isCompleted && "completed"}">
                <li class="todo-item">${todo.title}</li>
                <button class="complete-btn" onclick=doTodoHandler("${
                  todo.id
                }")>
                    <i class="fas fa-check-circle"></i>
                </button>
                <button class="trash-btn" onclick=removeTodoHandler("${
                  todo.id
                }")>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
    );
  });
}
