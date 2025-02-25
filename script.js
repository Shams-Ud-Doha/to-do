document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    fetch("api.php?action=get")
        .then(res => res.json())
        .then(data => {
            let taskList = document.getElementById("task-list");
            taskList.innerHTML = "";
            data.forEach(task => {
                let li = document.createElement("li");
                li.innerHTML = `${task.task} 
                    <button onclick="toggleTask(${task.id})">✔</button>
                    <button onclick="deleteTask(${task.id})">❌</button>`;
                if (task.completed) li.classList.add("completed");
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    let taskInput = document.getElementById("task-input");
    fetch("api.php?action=add", {
        method: "POST",
        body: new URLSearchParams({task: taskInput.value})
    }).then(() => {
        taskInput.value = "";
        loadTasks();
    });
}

function deleteTask(id) {
    fetch("api.php?action=delete", {
        method: "POST",
        body: new URLSearchParams({id})
    }).then(loadTasks);
}

function toggleTask(id) {
    fetch("api.php?action=toggle", {
        method: "POST",
        body: new URLSearchParams({id})
    }).then(loadTasks);
}

// Light/Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
