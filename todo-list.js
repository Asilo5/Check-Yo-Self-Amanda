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

	deleteFromStorage() {

	}

	updateToDo() {
		// Update todos title and urgency

	}

	updateTask() {
       // Update tasks content and if it has been completed

	}
}