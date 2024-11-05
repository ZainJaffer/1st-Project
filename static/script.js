// Select HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Add event listener for "Add Task" button
addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents any default Enter behavior
        addTask(); // Calls addTask function to add the new task
    }
});

// Load tasks from the API when the page loads
async function loadTasks() {
    const response = await fetch("http://127.0.0.1:5000/tasks");  // Fetch tasks from the API
    const tasks = await response.json();  // Parse the JSON response

    tasks.forEach(task => {
        displayTask(task);  // Use the display function to show each task
    });
}

// Call loadTasks when the page loads
loadTasks();

async function addTask() {
    const taskTitle = taskInput.value.trim();
    if (taskTitle === "") {
        alert("Task title cannot be empty.");
        return;
    }

    console.log("Adding task:", taskTitle);  // Check if addTask is triggered

    // Send the task to the back end
    const response = await fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: taskTitle })
    });

    console.log("Response status:", response.status);  // Check server response status

    if (!response.ok) {
        console.error("Failed to add task. Server responded with:", response.status);
        return;
    }

    const newTask = await response.json();  // Parse the response from the server
    console.log("Task added:", newTask);  // Log the added task from the server

    // Display the new task in the list
    displayTask(newTask);

    // Clear the input field
    taskInput.value = "";
}



function displayTask(task) {
    const listItem = document.createElement("li");
    listItem.classList.add("task");

    // Create the task text
    const taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = task.title;
    if (task.completed) taskSpan.classList.add("completed");

    // Add event listener to toggle completed class on click
    taskSpan.addEventListener("click", () => {
        taskSpan.classList.toggle("completed");
    });

    // Create the button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create the edit and delete buttons
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    // Delete button event listener
    deleteButton.addEventListener("click", () => {
        deleteTask(task.id, listItem);
    });

    // Edit button event listener
    editButton.addEventListener("click", () => {
        toggleEditMode(taskSpan, editButton);
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(taskSpan);
    listItem.appendChild(buttonContainer);

    taskList.appendChild(listItem);
}

function toggleEditMode(taskSpan, editButton) {
    if (editButton.textContent === "Edit") {
        // Switch to edit mode
        taskSpan.contentEditable = true;
        taskSpan.focus();
        editButton.textContent = "Save";
    } else {
        // Switch back to view mode
        taskSpan.contentEditable = false;
        editButton.textContent = "Edit";
    }
}

async function deleteTask(taskId, listItem) {
    // Send a DELETE request to the back end
    await fetch(`http://127.0.0.1:5000/tasks/${taskId}`, {
        method: "DELETE"
    });

    // Remove the task from the DOM
    taskList.removeChild(listItem);
}