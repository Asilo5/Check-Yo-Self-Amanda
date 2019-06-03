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
var bulletPointsContainer = document.querySelector('.pre-todos-to-print');
var listSideContainer = document.querySelector('.display-pre-todos');
var ulSideContainer = document.querySelector('.pre-todos-to-print');
var arrayOfTasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.addEventListener('load', newTasksArray);
window.addEventListener('load', loadTasksMessage);
makeTaskBtn.addEventListener('click', saveTasksInfo);
// toDoSection.addEventListener('click', toggleUrgent);
taskInput.addEventListener('keyup', disableBtnToggle);
clearAllBtn.addEventListener('click', clearAllTheInputs);
addBtn.addEventListener('click', asideBulletPoints);
ulSideContainer.addEventListener('click', delteDisplayedTask);


function saveTasksInfo(e) { 
  e.preventDefault();
  var savedTasks = new toDoList(Date.now(), taskTitle.value, loopSideTasks());
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
  var sideTasks = '';
  for(var i = 0; i < task.tasks.length; i++) {
  sideTasks += `<section class="to-do-check">
            <img src="images/checkbox.svg" class="check-task">
            <p class="task-printed" contenteditable = 'true'>${task.tasks[i]}</p>
          </section>`
        };

    // if(task.urgent === true){
    //   toggleUrgentInput.src = "images/urgent-active.svg";
    // } else {
    //   toggleUrgentInput.src = "images/urgent.svg";
    // };

  var cardSection = 
  `<section class="task-card" data-id=${task.id}>
          <h2 class="title-printed" contenteditable = 'true'>${task.title}</h2>
          ${sideTasks}
          <section class="img-buttons">
            <div class="urgent">
              <input type="image" src="images/urgent.svg" class="urgent-btn" alt="Thunder urgent button">
              <p>URGENT</p>
           </div>
           <div class="delete">
              <input type="image" src="images/delete.svg" class="delete-btn" alt="Delete X button">
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
   disableMakeTaskBtn(addBtn);
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

function asideBulletPoints() {
  bulletPointsContainer.insertAdjacentHTML('beforeend', 
    `<li class='printed-lists'>${taskInput.value}</li>`);
  taskInput.value = '';

  if(taskTitle.value === '' && taskInput.value === '') {
    addBtn.disabled = true;
    addBtn.classList.add('disabled');
  };
}

function delteDisplayedTask(e) {
  var listSideContainer = document.querySelector('.printed-lists');
   if (e.target.className === 'printed-lists') {
    listSideContainer.remove();
  };
}

function loopSideTasks() {
  var asideLi = document.querySelectorAll('.printed-lists');
  var asideLiAsArray = Array.from(asideLi);
  var newAsideLi = asideLiAsArray.map(function(element){
    return element.innerText
  });
   return newAsideLi;
}

// function toggleUrgent(e) {
//   var urgentInput = document.querySelector('.urgent-btn');

//   if(e.target.className === 'urgent-btn') {
//     var urgent = e.target.parentElement.parentElement.parentElement;
//     console.log('urgent parent', urgent);
//     var urgentId = urgent.dataset.id;
//     console.log('the ID of parent', urgentId);

//     var foundUrgentId = arrayOfTasks.find(function(arrayId){
//       console.log('the arrayId', arrayId.id);
//       console.log('the inside urgentId', parseInt(urgentId));
//       return arrayId.id === parseInt(urgentId);
//     });

//     console.log('foundUrgentId --->', foundUrgentId);

//     foundUrgentId.updateToDo(arrayOfTasks);

//     var toggleUrgentInput = e.target;

//     // console.log(toggleUrgent);
    
//     if(foundUrgentId.urgent === true){
//       toggleUrgentInput.src = "images/urgent-active.svg";
//     } else {
//       toggleUrgentInput.src = "images/urgent.svg";
//     };
//   }
// }








