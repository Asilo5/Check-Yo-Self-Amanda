class toDoList {
	constructor(id, title, tasks, urgent) {
      this.id = id;
      this.title = title;
      this.tasks = tasks || [];
      this.urgent = urgent || false; 
	}

	saveToStorage(taskArray) {
    	var stringifiedTasks = JSON.stringify(taskArray);
    	localStorage.setItem('tasks', stringifiedTasks);
	}

	deleteFromStorage(idOfCard) {
      
      var returnNewArray = arrayOfTasks.filter(function(taskCard) {
        return taskCard.id != idOfCard;
      })
      this.saveToStorage(returnNewArray);
	}

	updateToDo(array) {
		// Update todos title and urgency
		this.urgent = !this.urgent;
		this.saveToStorage(array);
	}

	updateTask(array) {
       // Update tasks content and if it has been completed

        this.saveToStorage(array);
	}
}