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

	deleteFromStorage(arrayOfTasks, idOfTask) {
		
      var index = arrayOfTasks.find(function(task) {
      	return task.id == idOfTask;
      });

      arrayOfTasks.splice(index, 1)
      
      this.saveToStorage(arrayOfTasks);
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