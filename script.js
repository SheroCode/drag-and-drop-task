var input = document.querySelector("#textVal");
var addBtn = document.querySelector(".add-project-btn");
var inProgress = document.querySelector("#progress"); //progress ul
var containers = document.querySelectorAll(".tasksSection"); //ul

var index = 0;

// Prevent form submission
document.querySelector("#form").addEventListener("submit", function (e) {
  e.preventDefault();
});

function dragOver(e) {
  e.preventDefault();
}

// Add new task
addBtn.addEventListener("click", function () {
  var inputValue = input.value.trim();
  if (!inputValue) return;
  createTask(inputValue);
  input.value = "";
});

// Create a task and append it to "In Progress" or other sections
function createTask(inputValue, sectionId = "progress", taskId = null) {
  var li = document.createElement("li");
  li.setAttribute("draggable", "true");
  li.id = taskId !== null ? taskId : index++;
  li.textContent = inputValue;

  li.addEventListener("dragstart", dragStart);

  document.getElementById(sectionId).appendChild(li);
  saveAllTasks(); // Save after creating
}

// Enable drag over and drop for each container
for (var i = 0; i < containers.length; i++) {
  containers[i].addEventListener("dragover", dragOver);
  containers[i].addEventListener("drop", drop);
}

// When dragging starts
function dragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

// When dropped into another container
function drop(e) {
  e.preventDefault();
  var data = e.dataTransfer.getData("text");
  var draggedEl = document.getElementById(data);
  var target = e.target;

  // Ensure we drop in UL not on LI
  if (target.tagName === "LI") {
    target.parentElement.appendChild(draggedEl);
  } else if (target.classList.contains("tasksSection")) {
    target.appendChild(draggedEl);
  }

  saveAllTasks(); // Save new positions
}

// Gather all tasks from all sections
function createList() {
  var taskList = [];

  for (var i = 0; i < containers.length; i++) {
    var section = containers[i];
    var tasks = section.querySelectorAll("li");

    for (var j = 0; j < tasks.length; j++) {
      taskList.push({
        id: parseInt(tasks[j].id),
        text: tasks[j].textContent,
        sectionId: section.id,
      });
    }
  }

  return taskList;
}

// Save all tasks to localStorage
function saveAllTasks() {
  var taskList = createList();
  localStorage.setItem("tasksList", JSON.stringify(taskList));
}

// Load tasks from localStorage when page loads
function loadTasksFromStorage() {
  var taskList = JSON.parse(localStorage.getItem("tasksList")) || [];

  // Find the highest id to avoid duplicate IDs
  var maxId = -1;

  for (var i = 0; i < taskList.length; i++) {
    var task = taskList[i];
    createTask(task.text, task.sectionId, task.id);
    if (task.id > maxId) {
      maxId = task.id;
    }
  }

  index = maxId + 1;
}

// Load existing tasks on page load
window.onload = loadTasksFromStorage;
