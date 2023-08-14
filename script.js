let btnAdd = document.querySelector('#addButton');
let ul = document.querySelector('.task-list');
let inp = document.querySelector('#newTask');

let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

populateTaskList(savedTasks);

btnAdd.addEventListener('click', function(){
  if (inp.value.trim() !== '') {
    savedTasks.push(inp.value.trim());
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    
    populateTaskList(savedTasks);
    inp.value = '';
  }
});

function populateTaskList(tasks) {
  ul.innerHTML = '';
  tasks.forEach(taskText => {
    createTaskElement(taskText);
  });
}

function createTaskElement(taskText) {
  let li = document.createElement('li');
  li.classList.add('task');  

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox'); 

  let span = document.createElement('span');
  span.classList.add('task-text');  
  span.textContent = taskText;

  let editButton = document.createElement('button');
  editButton.classList.add('edit-button');  
  editButton.textContent = 'Редагувати';

  let deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button'); 
  deleteButton.textContent = 'Видалити';

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  ul.appendChild(li);

  let deleteButton1 = li.querySelector('.delete-button');
  deleteButton1.addEventListener('click', function(){
    li.remove();
    savedTasks = savedTasks.filter(savedTask => savedTask !== taskText);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  });

  let changeBtn = li.querySelector('.edit-button');
  changeBtn.addEventListener('click', function(){
    let newText = prompt('Введіть новий текст завдання:', span.textContent);
    if (newText !== null && newText.trim() !== '') {
      span.textContent = newText;
      savedTasks[savedTasks.indexOf(taskText)] = newText;
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
  });
}
