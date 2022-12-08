// select elements
const input = document.getElementById('text');
const todolistContainer = document.querySelector('.todo-list');

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
    editTodoId = -1;
  } else {
    todoArr.push({
      description: inputValue,
      complete: false,
      index: todoArr.length
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
    <input type="checkbox" class="checkbox" job="complete">
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
  renderTodo();
  localStorage.setItem('TODO', JSON.stringify(todoArr));
};

// eslint-disable-next-line object-curly-newline
export { addTodo, editTodo, deleteTodo, renderTodo, todolistContainer };
