import './style.css';

// select elements
const todlistContainer = document.querySelector('.todo-list');

// todo array
const todoArr = [
  {
    description: 'drink coffee',
    completed: false,
    index: 4
  },
  {
    description: 'drink water',
    completed: false,
    index: 2
  },
  {
    description: 'have dinner',
    completed: false,
    index: 3
  }
];

const renderTodo = (todo) => {
  todlistContainer.innerHTML += `
  <div id="list">
    <input type="checkbox" class="checkbox" job="complete"">
    <p contenteditable="true" class="text" spellcheck="false">${todo.description}</p>
    <i class="fa-regular fa-trash-can job="delete"></i>
 </div>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  todoArr.sort((a, b) => a.index - b.index).map((item) => renderTodo(item));
});
