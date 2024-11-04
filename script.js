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

    // Create the task item container
    const listItem = document.createElement("li");
    listItem.classList.add("task");

    // Create the task text
    const taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = taskTitle;

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
        if (editButton.textContent === "Edit") {
            // Switch to edit mode
            taskSpan.contentEditable = true;
            taskSpan.focus(); // Focus on the task text for editing
            editButton.textContent = "Save"; // Change button text to Save
        } else {
            // Switch back to view mode
            taskSpan.contentEditable = false;
            editButton.textContent = "Edit"; // Change button text back to Edit
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
