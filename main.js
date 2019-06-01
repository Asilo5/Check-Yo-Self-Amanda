var searchBtn = document.querySelector('.search-button');
var searchInput = document.querySelector('.search-input');
var taskTitle = document.querySelector('#task-title');
var taskInput = document.querySelector('#task-item');
var addBtn = document.querySelector('.add-button');
var makeTaskBtn= document.querySelector('.make-task-btn');
var clearAllBtn = document.querySelector('.clear-all-btn');
var filterByBtn = document.querySelector('.filter-by-btn');
var toDoSection = document.querySelector('.to-do-list');
var windowLoadMsg = document.querySelector('.first-page-text');
var arrayOfTasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.addEventListener('load', newTasksArray);
window.addEventListener('load', loadTasksMessage);
makeTaskBtn.addEventListener('click', saveTasksInfo);
taskInput.addEventListener('keyup', disableBtnToggle);
clearAllBtn.addEventListener('click', clearAllTheInputs);

function saveTasksInfo(e) { 
  e.preventDefault();
  var savedTasks = new toDoList(Date.now(), taskTitle.value, taskInput.value);
  arrayOfTasks.push(savedTasks);
  savedTasks.saveToStorage(arrayOfTasks);
  printTasksToCards(savedTasks);
  clearAllTheInputs();
  loadTasksMessage();
};

function newTasksArray() {
  arrayOfTasks = arrayOfTasks.map(function(oldTasks) {
    var newTasks = new toDoList(oldTasks.id, oldTasks.title, oldTasks.tasks, oldTasks.urgent);
    printTasksToCards(newTasks);
    return newTasks;
  });
};

function printTasksToCards(task) {
  var cardSection = 
  `<section class="task-card" data-id=${task.id}>
          <h2 class="title-printed" contenteditable = 'true'>${task.title}</h2>
          <section class="to-do-check">
            <img src="images/checkbox.svg" class="check-task">
            <p class="task-printed" contenteditable = 'true'>${task.tasks}</p>
          </section>
          <section class="img-buttons">
            <div class="urgent">
              <img src="images/urgent.svg" class="urgent-btn" alt="Thunder urgent button">
              <p>URGENT</p>
           </div>
           <div class="delete">
              <img src="images/delete.svg" class="delete-btn" alt="Delete X button">
              <p>DELETE</p>
          </div>
          </section>
        </section>`;
  toDoSection.insertAdjacentHTML('afterbegin', cardSection);
};

function loadTasksMessage() {
  if(arrayOfTasks.length === 0){
    windowLoadMsg.innerText = `Add your to-do's first, please!`;
  } else {
    windowLoadMsg.innerText = '';
  }
};

function disableBtnToggle() {
   disableMakeTaskBtn(makeTaskBtn);
   disableMakeTaskBtn(clearAllBtn);
}

function disableMakeTaskBtn(button) {
  if(taskTitle.value === '' && taskInput.value === '') {
    button.disabled = true;
    button.classList.add('disabled');
  } else {
    button.disabled = false;
    button.classList.remove('disabled');
  }
};

function clearAllTheInputs() {
  taskTitle.value = '';
  taskInput.value = '';
}