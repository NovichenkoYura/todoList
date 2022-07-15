const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('desription-task');
const todosWrapper = document.querySelector('.todos-wrapper');
const footerBtnWrap = document.querySelector('.footer-wrap')
const taskCompleteBtn = document.getElementById('btn-complete')

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemsElems = [];

function Task(description) {
	this.description = description;
	this.completed = false;
}

const createTemplateTasks = (task, index) => {
	return `
		<div class="todo-item ${task.completed ? 'checked' : ''}">
			<div class="description">${task.description}</div>
			<div class="buttons">
				<input onclick='completeTask(${index})' class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
				<button onclick='deleteTask(${index})' class="btn-delete">Delete</button>
			</div>        
		</div>	
	`
}

const fillHtmlList = () => {
	todosWrapper.innerHTML = "";
	if (tasks.length > 0) {
		tasks.forEach((item, index) => {
			todosWrapper.innerHTML += createTemplateTasks(item, index);
						
		});
		todoItemsElems = document.querySelectorAll('.todo-item');
	}
} 

fillHtmlList();

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));	
}

const completeTask = index => {
	// console.log(index);
	tasks[index].completed = !tasks[index].completed;
	if (tasks[index].completed) {
		todoItemsElems[index].classList.add('checked');
	} else {
		todoItemsElems[index].classList.remove('checked');
	}
	updateLocal();
	fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
	tasks.push(new Task(deskTaskInput.value));	
	updateLocal();
	fillHtmlList();
	deskTaskInput.value = '';
	renderFooterBtn(tasks);
	
})

const deleteTask = index => {
	todoItemsElems[index].classList.add('delition')
	
	setTimeout(() => {
		tasks.splice(index, 1);
	updateLocal();
	fillHtmlList();
		
	}, 500)
}

const createTemplateFooterBtn = (tasks) => {
	const activeTask = tasks.filter(item => item.completed === false);
	const completedTask = tasks.filter(item => item.completed === true);
	console.log(activeTask.length)
	console.log(completedTask)
	return `
		<p class="items-left">${activeTask.length}items left</p>
		<button id="all-tasks">All</button>
		<button id="active-tasks">Active</button>
		<button id="completed-tasks">Completed</button>
		<button id="clear-completed-tasks">Clear completed</button>

	`
}

const renderFooterBtn = (tasks) => {
	footerBtnWrap.innerHTML = "";
	updateLocal()
	footerBtnWrap.innerHTML = createTemplateFooterBtn(tasks)
	
}

taskCompleteBtn.addEventListener('click', renderFooterBtn())

