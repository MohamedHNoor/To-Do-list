import './css/style.css';

import { form, clearAll, todolistContainer } from './modules/variables.js';
import {
  addTodo,
  editTodo,
  deleteTodo,
  renderTodo,
  todoArr,
  checkTodo,
  completeTodo,
  checkValue
} from './modules/functionality.js';

// select elements

// form submit
form.addEventListener('submit', (Event) => {
  Event.preventDefault();
  addTodo();
  renderTodo();
  localStorage.setItem('TODO', JSON.stringify(todoArr));
});

// Click event listener for all todos
todolistContainer.addEventListener('click', (event) => {
  const { target } = event;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'list') return;

  // todo id
  const todo = parentElement;
  const todoId = Number(todo.id);

  // target action
  const { action } = target.dataset;

  if (action === 'edit') editTodo(todoId);
  if (action === 'delete') deleteTodo(todoId);
});

clearAll.addEventListener('click', () => {
  completeTodo();
});

todolistContainer.addEventListener('change', (event) => {
  const { target } = event;
  console.log(target);
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('list')) return;
  const todoId = Number(parentElement.id);
  // target the data action
  const { action } = target.dataset;

  if (action === 'checkbox') {
    checkTodo(todoId, target);
    checkValue(target);
  }
});

window.addEventListener('DOMContentLoaded', renderTodo);
