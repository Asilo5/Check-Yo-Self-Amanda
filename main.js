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
toDoSection.addEventListener('click', toggleUrgent);
taskInput.addEventListener('keyup', disableBtnToggle);
clearAllBtn.addEventListener('click', clearAllTheInputs);
addBtn.addEventListener('click', asideBulletPoints);
ulSideContainer.addEventListener('click', delteDisplayedTask);
searchInput.addEventListener('keyup', filterSearchTerms);

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
        if(task.tasks[i].isChecked === true) {
      checkedSrc = "images/checkbox-active.svg";
    } else {
      checkedSrc = "images/checkbox.svg";
    }
  sideTasks += `<section class="to-do-check">
            <input type="image" src="${checkedSrc}" class="check-task" id="${i}" onclick="checkedItems(this)">
            <p class="task-printed" contenteditable = 'true'>${task.tasks[i].text}</p>
          </section>`
        };

    if(task.urgent === true) {
      urgentSrc = "images/urgent-active.svg";
      var urgentInput = "task-card-urgent"
    } else {
      urgentSrc = "images/urgent.svg";
      urgentInput = ""
    };

  var cardSection = 
  `<section class="task-card ${urgentInput}" data-id=${task.id}>
          <h2 class="title-printed" contenteditable = 'true'>${task.title}</h2>
          ${sideTasks}
          <section class="img-buttons">
            <div class="urgent">
              <input type="image" src="${urgentSrc}" class="urgent-btn" alt="Thunder urgent button">
              <p>URGENT</p>
           </div>
           <div class="delete">
              <input type="image" src="images/delete.svg" class="delete-btn" id="delete-button-${task.id}" onclick="deleteCard(this)" alt="Delete X button" disabled>
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

function asideBulletPoints(e) {
  e.preventDefault();
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
    obj = {
      text: element.innerText,
      isChecked: false
    }
    return obj;
  });
   return newAsideLi;
}

function toggleUrgent(e) {
  var urgentInput = document.querySelector('.urgent-btn');
  if(e.target.className === 'urgent-btn') {
    var urgent = e.target.parentElement.parentElement.parentElement;
    var urgentId = urgent.dataset.id;
    var foundUrgentId = arrayOfTasks.find(function(arrayId){
      return arrayId.id === parseInt(urgentId);
    });
  foundUrgentId.updateToDo(arrayOfTasks);
  var toggleUrgentInput = e.target;
  if(foundUrgentId.urgent === true){
    toggleUrgentInput.src = "images/urgent-active.svg";
    urgent.classList.add('task-card-urgent');
  } else {
    toggleUrgentInput.src = "images/urgent.svg";
    urgent.classList.remove('task-card-urgent');
    };
  }
}

function checkedItems(e) {
     var indexOfTask = parseInt(e.id);
     var idOfTaskList = parseInt(e.closest('.task-card').dataset.id);
     var taskList = arrayOfTasks.find(function(task) {
      return idOfTaskList === task.id;
     });
  if(e.attributes.src.nodeValue == "images/checkbox.svg") {
    e.attributes.src.nodeValue = "images/checkbox-active.svg";
    taskList.tasks[indexOfTask].isChecked = !taskList.tasks[indexOfTask].isChecked;
    taskList.updateTask(arrayOfTasks);
  } else {
     e.attributes.src.nodeValue = "images/checkbox.svg";
     taskList.tasks[indexOfTask].isChecked = !taskList.tasks[indexOfTask].isChecked;
     taskList.updateTask(arrayOfTasks);
       }
    enableDeleteButton(taskList);
  }

function enableDeleteButton(taskList) {
  var isComplete = taskList.tasks.every(function(task) {
    return task.isChecked === true;
  });
  if (isComplete === true) {
    document.querySelector(`#delete-button-${taskList.id}`).disabled = false;
    document.querySelector(`#delete-button-${taskList.id}`).classList.remove('disabled');
  } else {
    document.querySelector(`#delete-button-${taskList.id}`).disabled = true;
    document.querySelector(`#delete-button-${taskList.id}`).classList.add('disabled');
  }
}

function deleteCard(e) {
    var todoCard = e.parentElement.parentElement.parentElement;
    var idOfTaskList = parseInt(todoCard.dataset.id);
    var taskList = arrayOfTasks.find(function(taskCard) {
    return taskCard.id == idOfTaskList;
    });
    console.log(taskList);
  if(e.className === 'delete-btn') {
    todoCard.remove();
    taskList.deleteFromStorage(arrayOfTasks, idOfTaskList);
  }
}

function filterSearchTerms(e) {
    var searchText = e.target.value.toUpperCase();
    var results = arrayOfTasks.filter(function(task){
        return task.title.toUpperCase().includes(searchText);
    })
    document.querySelector(".to-do-list").innerHTML = '';
    results.forEach(function(task){
      printTasksToCards(task);
    });
};















