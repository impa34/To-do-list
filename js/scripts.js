// Getting info from the form
let listener = document.getElementById("text-input");
let tasks = document.getElementById("tasks");
let prio = document.getElementById("prio-select");
let deadline = document.getElementById("deadline");
const button = document.getElementById("button");
const form = document.getElementById("entry");


// Added flatpickr for date management
let flatpickrInstance;

// Functions to save and load tasks after reloading page
function saveTasks() {
    const tasks = document.getElementById("tasks").innerHTML
    localStorage.setItem("savedTasks", tasks)
}

function loadTasks() {
    const savedTasks = localStorage.getItem("savedTasks");
    if (savedTasks) {
        document.getElementById("tasks").innerHTML = savedTasks;
        // Reassign event listeners after reloading page
        document.querySelectorAll(".checkbox").forEach(checkBox => {
            checkBox.addEventListener("click", function () {
                const container = this.parentElement;
                container.classList.remove("task-enter");
                container.classList.add("task-exit");
                setTimeout(() => {
                    container.remove,
                    saveTasks();},
                    400);
                
            })
        })
    }
}

document.addEventListener("DOMContentLoaded", function () {
    flatpickrInstance = flatpickr("#deadline", {
        dateFormat: "d/m/Y",
        locale: "en",
        allowInput: true,
    });
    loadTasks();
});



// Function to add the new task into the html
button.addEventListener("click", function () {
    // Added a task container to manage checkboxes and tasks simultaneoulsy
    let container = document.createElement("div");
    container.classList.add("task-container", "task-enter");

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");

    let newTask = document.createElement("p");
    newTask.classList.add("task");
    
    // Setting a deadline
    let deadlineSpan = document.createElement("span");
    if (flatpickrInstance.selectedDates.length > 0) {
        deadlineSpan.innerText = ` ${flatpickrInstance.formatDate(flatpickrInstance.selectedDates[0], "d/m/Y")}`
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
    } else if (prio.value === "Low") {
        prioritySpan.classList.add("priority-low");
    } else {
        return alert ("Must provide priority of the task");
    }
    // Validations
    newTask.innerText = listener.value
    if (newTask.innerText == "") {
        return alert("Must set a name");
    }
    // Appending the tasks to the list
    newTask.appendChild(deadlineSpan);
    newTask.appendChild(prioritySpan);
    container.appendChild(checkBox);
    container.appendChild(newTask);
    tasks.appendChild(container);
    
    // Saving tasks into the localStorage
    saveTasks();
    // As checkbox is clicked text disappears
    checkBox.addEventListener("click", function() {
        container.classList.remove("task-enter");
        container.classList.add("task-exit");

        setTimeout(() => {
        container.remove();
        saveTasks();
        }, 400);
    })


    // Clear values after adding
    listener.value = "";
    flatpickrInstance.clear();
    prio.value = "";
})

form.append(button);