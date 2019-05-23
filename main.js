var searchBtn = document.querySelector('.search-button');
var searchInput = document.querySelector('.search-input');
var taskTitle = document.querySelector('#task-title');
var taskItem = document.querySelector('#task-item');
var addBtn = document.querySelector('.add-button');
var makeTaskBtn= document.querySelector('.make-task-btn');
var clearAllBtn = document.querySelector('.clear-all-btn');
var filterByBtn = document.querySelector('.filter-by-btn');
var toDoSection = document.querySelector('.to-do-list');
var localStore = JSON.parse(localStorage.getItem());

makeTaskBtn.addEventListener('click', printCard);

function printCard(e) {
  e.preventDefault();
  var theTask = document.createElement('section');
  toDoSection.prepend(theTask);
  theTask.innerHTML += 
  `<section class="task-card">
   <h2>Task Title</h2>
    <section>
    <p> task task task </p>
    </section>
     <img src="">
     <img src="">
    </section>` 
}