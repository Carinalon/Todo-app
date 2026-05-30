const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');

const tasks = [];

const app = {
    tasks,
    taskList,
    newTaskInput
};
window.onload = function  (){
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; //parse texto a objeto
    app.tasks = savedTasks.map((task) => {
        return createTask(task.title, task.isCompleted);
    });
    app.tasks.forEach((task) => {
        return addTaskToList(task, app.taskList);
    });

}
function saveTasksToLocalStorage(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks)); //stringi convierte objeto a  texto.
}


function createTask(title, isCompleted = false) { //crea el objeto tarea con un id unico, el titulo y el estado de completado
    return {
        id: Date.now(),
        title,
        isCompleted,
    };
}

function addTaskToList(task, taskList) {  //crea el elemento de la tarea y lo agrega a la lista de tareas
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
}
function addTask(app) {  //añade el elemento tarea a la lista 
    const newTaskTitle = app.newTaskInput.value;
    const newTask = createTask(newTaskTitle);
    app.tasks.push(newTask);

    addTaskToList(newTask, app.taskList);
    saveTasksToLocalStorage(app.tasks);
    app.newTaskInput.value = '';
}

function createTaskElement(task) {
    const taskElement = document.createElement('li');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.isCompleted;
    taskCheckbox.addEventListener('change', () => {
        task.isCompleted = taskCheckbox.checked;
        taskText.classList.toggle("completed", task.isCompleted);
        saveTasksToLocalStorage(app.tasks);
    });


    const taskText = document.createElement('span');
    taskText.textContent = task.title;
    taskText.classList.toggle("completed", task.isCompleted);

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.textContent = 'Eliminar';
    taskDeleteButton.className = 'delete-button';
    taskDeleteButton.addEventListener('click', () =>{
        taskElement.remove();//elimina la tarea de la lista
    
        const taskIndex = app.tasks.indexOf(task);
        if (taskIndex > -1){
            app.tasks.splice(taskIndex, 1);
        }
        saveTasksToLocalStorage(app.tasks);

    })

    taskElement.appendChild(taskCheckbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(taskDeleteButton);

    return taskElement;

}

addTaskButton.addEventListener('click', () => {
    addTask(app);
});
newTaskInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addTask(app);
    }
});