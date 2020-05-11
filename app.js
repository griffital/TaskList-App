/* ----------------------------------
VARIABLES
---------------------------------- */

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


/* ----------------------------------
LOAD EVENT LISTENERS
---------------------------------- */

loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}


/* ----------------------------------
GET TASKS FROM LOCAL STORAGE (if any)
---------------------------------- */

function getTasks() { 
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement('li');
    // Adding class name
    li.className = 'collection-item';
    // Create text node & append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  });
}


/* ----------------------------------
ADD A NEW TASK
---------------------------------- */

function addTask(e) {

  // stops you clicking 'add task' and an empty task box appearing
  if(taskInput.value === '') {
    return;
  } 
  
  const li = document.createElement('li'); // Create li element
  li.className = 'collection-item'; // Adding class name
  li.appendChild(document.createTextNode(taskInput.value)); // Create text node (what the task is going to say) & append to li (put li into the ul)

  // Create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  // Add li element to ul list
  taskList.appendChild(li);

  // Stored the user input into local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input field
  taskInput.value = '';

  e.preventDefault(); // prevents default behaviour, in this case, the form submitting
}

// Store Task in LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


/* ----------------------------------
REMOVE TASK
---------------------------------- */

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {

      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


/* ----------------------------------
CLEAR TASKS
---------------------------------- */

function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}


/* ----------------------------------
FILTER TASKS
---------------------------------- */

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}