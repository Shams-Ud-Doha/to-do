document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    document.getElementById("add-task").addEventListener("click", addTask);
    document.getElementById("clear-tasks").addEventListener("click", clearTasks);
    document.getElementById("clear-completed").addEventListener("click", clearCompleted);
    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        let li = createTaskListItem(task);
        taskList.appendChild(li);
    });
}

function createTaskListItem(task) {
    let li = document.createElement("li");
    li.innerHTML = `${task.task} 
        <button class="toggle-task">✔</button>
        <button class="delete-task">❌</button>`;
    if (task.completed) li.classList.add("completed");

    li.querySelector(".toggle-task").addEventListener("click", () => toggleTask(task.id));
    li.querySelector(".delete-task").addEventListener("click", () => deleteTask(task.id));

    return li;
}

function addTask() {
    let taskInput = document.getElementById("task-input");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTask = {
        id: Date.now(),
        task: taskInput.value,
        completed: false
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function toggleTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function clearTasks() {
    localStorage.removeItem("tasks");
    loadTasks();
}

function clearCompleted() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
