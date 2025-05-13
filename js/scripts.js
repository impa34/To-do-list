// Getting info from the form
let listener = document.getElementById("text-input")
let tasks = document.getElementById("tasks")
let prio = document.getElementById("prio-select")
let deadline = document.getElementById("deadline")
const button = document.getElementById("button")

// Function to add the new task into the html
button.addEventListener("click", function () {
    let newTask = document.createElement("p")
    newTask.classList.add("task")

    let checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    checkBox.classList.add("checkbox")
    // Setting a deadline
    let deadlineSpan = document.createElement("span")
    deadlineSpan.innerText = `${deadline.value}`
    // Creating a span to store the value of the select form 
    let prioritySpan = document.createElement("span")
    prioritySpan.innerText = `${prio.value}`

    // Setting a color for each priority
    if (prio.value == "High") {
        prioritySpan.style.color = "red";
    } else if (prio.value == "Medium") {
        prioritySpan.style.color = "yellow";
    } else {
        prioritySpan.style.color = "cyan";
    }
    newTask.innerText = listener.value
    if (newTask.innerText == "") {
        return alert("Must set a name")
    }
    newTask.appendChild(prioritySpan);
    newTask.appendChild(deadlineSpan);
    
    // Appending the tasks to the list
    tasks.append(newTask)
    tasks.append(checkBox)
    // As checkbox is clicked text disappears
    checkBox.addEventListener("click", function() {
        tasks.removeChild(newTask)
        tasks.removeChild(checkBox)
    })
})

document.body.append(button);