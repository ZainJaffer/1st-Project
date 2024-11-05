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

function addTask() {
    const taskTitle = taskInput.value.trim();
    if (taskTitle === "") {
        alert("Task title cannot be empty.");
        return;
    }

    // Create the task item container
    const listItem = document.createElement("li");
    listItem.classList.add("task");

    // Create the task text
    const taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = taskTitle;

    // Add an event listener to toggle the completed class on click
    taskSpan.addEventListener("click", () => {
    taskSpan.classList.toggle("completed"); // Toggle line-through class
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

    // Add event listener to delete the task when delete button is clicked
    deleteButton.addEventListener("click", () => {
        taskList.removeChild(listItem);
    });

    // Add event listener to edit the task when edit button is clicked
    editButton.addEventListener("click", () => {
        toggleEditMode(taskSpan, editButton);
    });

    taskSpan.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents adding a new line
            toggleEditMode(taskSpan, editButton); // Save the task
        }
    });

    // Append buttons to the button container
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Append task text and button container to the task item
    listItem.appendChild(taskSpan);
    listItem.appendChild(buttonContainer);

    // Append the task item to the task list
    taskList.appendChild(listItem);
    taskInput.value = "";
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