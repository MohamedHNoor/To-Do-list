import { input, todolistContainer } from './variables.js';
import checkValue from './checkStatus.js';

// eslint-disable-next-line import/no-mutable-exports
export let todoArr = JSON.parse(localStorage.getItem('TODO')) || [];
let editTodoId = -1;

// add to do
const addTodo = () => {
  const inputValue = input.value;

  // check if todo is empty
  const isempty = inputValue === '';
  if (isempty) {
    return;
  }
  if (editTodoId >= 0) {
    todoArr = todoArr.map((todo, index) => ({
      ...todo,
      description: index === editTodoId ? inputValue : todo.description
    }));
    // editTodoId = -1;
  } else {
    todoArr.push({
      description: inputValue,
      complete: false,
      index: todoArr.length + 1
    });
  }
  input.value = '';
};

// render todos function
const renderTodo = () => {
  // Clear render before a Re-render
  todolistContainer.innerHTML = '';

  // Render todos
  todoArr.forEach((todo, index) => {
    todolistContainer.innerHTML += `
  <div class="list" id=${index}>
  <input type="checkbox" data-action="checkbox">
    <p class="text" data-action="edit">${todo.description}</p>
    <i class="fa-regular fa-trash-can trash" data-action="delete" ></i>
</div>
  `;
  });
};

const editTodo = (todoId) => {
  input.value = todoArr[todoId].description;
  editTodoId = todoId;
};

const deleteTodo = (todoId) => {
  todoArr = todoArr.filter((todo, index) => index !== todoId);
  editTodoId = -1;
  for (let i = 0; i < todoArr.length; i += 1) {
    todoArr[i].index = i + 1;
  }
  renderTodo();
  localStorage.setItem('TODO', JSON.stringify(todoArr));
};

function checkTodo(todoId, box) {
  // todoArr = todoArr.map((todo, index) => ({
  //   ...todo,
  //   complete: index === todoId ? !todo.complete : todo.complete
  // }));
  console.log(todoArr[todoId].complete);
  box.nextElementSibling.classList.toggle('lineThrough');
  todoArr[todoId].complete = checkValue(box);
  if (todoArr[todoId].complete === true) {
    box.complete = true;
    box.nextElementSibling.classList.add('lineThrough');
  }
  localStorage.setItem('TODO', JSON.stringify(todoArr));
  // localStorage.setItem('TODO', JSON.stringify(todoArr));
}

const completeTodo = () => {
  todoArr = todoArr.filter((obj) => obj.complete !== true);
  renderTodo();
  for (let i = 0; i < todoArr.length; i += 1) {
    todoArr[i].index = i + 1;
  }
  localStorage.setItem('TODO', JSON.stringify(todoArr));
};

export {
  addTodo,
  editTodo,
  deleteTodo,
  renderTodo,
  todolistContainer,
  checkTodo,
  completeTodo,
  checkValue
};
