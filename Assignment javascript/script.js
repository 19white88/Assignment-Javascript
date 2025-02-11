document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = ""; 
        tasks.forEach((taskText, index) => {
            const li = createTaskElement(taskText, index);
            taskList.appendChild(li);
        });
    }

    function createTaskElement(taskText, index) {
        const li = document.createElement("li");
        li.textContent = taskText;
        li.dataset.index = index;
        li.addEventListener("click", removeTask);
        return li;
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        }
    }

    function removeTask(event) {
        const taskIndex = event.target.dataset.index;
        tasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    renderTasks();
});
