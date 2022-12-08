import './style.css';

import {
  addTodo,
  editTodo,
  deleteTodo,
  renderTodo,
  todolistContainer,
  todoArr
} from './functionality.js';

// select elements

const form = document.querySelector('form');

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

  if (action === 'edit') {
    editTodo(todoId);
  } else if (action === 'delete') {
    deleteTodo(todoId);
  }
});

window.addEventListener('DOMContentLoaded', renderTodo);
