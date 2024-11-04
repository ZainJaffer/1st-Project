// Select HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Add event listener for "Add Task" button
addTaskButton.addEventListener("click", addTask);

function addTask() {
    const taskTitle = taskInput.value.trim();

    if (taskTitle === "") {
        alert("Task title cannot be empty.");
        return;
    }

    const listItem = document.createElement("li");
    listItem.classList.add("task");
    listItem.textContent = taskTitle;

    // Add a click event to toggle completion
    listItem.addEventListener("click", () => {
        listItem.classList.toggle("completed");
    });

    taskList.appendChild(listItem);
    taskInput.value = "";
}
