// Getting info from the form
let listener = document.getElementById("text-input");
let tasks = document.getElementById("tasks");
let prio = document.getElementById("prio-select");
let deadline = document.getElementById("deadline");
const button = document.getElementById("button");
// Added flatpickr for date management
let flatpickrInstance;

document.addEventListener("DOMContentLoaded", function () {
    flatpickrInstance = flatpickr("#deadline", {
        dateFormat: "d/m/Y",
        locale: "en",
        allowInput: true,
    });
});

// Function to add the new task into the html
button.addEventListener("click", function () {
    // Added a task container to manage checkboxes and tasks simultaneoulsy
    let container = document.createElement("div");
    container.classList.add("task-container");

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");

    let newTask = document.createElement("p");
    newTask.classList.add("task");
    
    // Setting a deadline
    let deadlineSpan = document.createElement("span");
    if (flatpickrInstance.selectedDates.length > 0) {
        deadlineSpan.innerText = `${flatpickrInstance.formatDate(flatpickrInstance.selectedDates[0], "d/m/Y")})`
    } else {
        deadlineSpan.innerText = " (No deadline)";
    }
     
    
    // Creating a span to store the value of the select form 
    let prioritySpan = document.createElement("span");
    prioritySpan.classList.add("priority-span");
    prioritySpan.innerText = `${prio.value}`;

    // Setting a color for each priority
    if (prio.value === "High") {
        prioritySpan.classList.add("priority-high");
    } else if (prio.value === "Medium") {
        prioritySpan.classList.add("priority-medium");
    } else {
        prioritySpan.classList.add("priority-low");
    }
    // Validations
    newTask.innerText = listener.value
    if (newTask.innerText == "") {
        return alert("Must set a name");
    }
    // Appending the tasks to the list
    newTask.appendChild(prioritySpan);
    newTask.appendChild(deadlineSpan);
    container.appendChild(checkBox);
    container.appendChild(newTask);
    tasks.appendChild(container);

    // As checkbox is clicked text disappears
    checkBox.addEventListener("click", function() {
        tasks.removeChild(container);
    })
    // Clear values after adding
    listener.value = "";
    flatpickrInstance.clear();
    prio.value = "Priority";
})

document.body.append(button);