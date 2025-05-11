var input = document.querySelector("#textVal");
var addBtn = document.querySelector(".add-project-btn");
var inProgress = document.querySelector("#progress");
var containers = document.querySelectorAll(".tasksSection");

var index = 0;

document.querySelector("#form").addEventListener("submit", function (e) {
  e.preventDefault();
});

function dragOver(e) {
  e.preventDefault();
}

// Load tasks from localStorage on page load
window.addEventListener("load", function () {
  var storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  for (var i = 0; i < storedTasks.length; i++) {
    createTask(storedTasks[i].text, storedTasks[i].sectionId, storedTasks[i].id);
  }

  // Set next index (maximum existing id + 1)
  var maxId = -1;
  for (var i = 0; i < storedTasks.length; i++) {
    if (storedTasks[i].id > maxId) {
      maxId = storedTasks[i].id;
    }
  }
  index = maxId + 1;
});

addBtn.addEventListener("click", function () {
  var inputValue = input.value.trim();
  if (!inputValue) return;
  createTask(inputValue);
  input.value = "";
});

function createTask(inputValue, sectionId = "progress", taskId = null) {
  var li = document.createElement("li");
  li.setAttribute("draggable", "true");
  li.id = taskId !== null ? taskId : index++;
  li.textContent = inputValue;

  li.addEventListener("dragstart", dragStart);

  document.querySelector(`#${sectionId}`).appendChild(li);

  saveTasksToStorage();
}

for (var i = 0; i < containers.length; i++) {
  containers[i].addEventListener("dragover", dragOver);
  containers[i].addEventListener("drop", drop);
}

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const dropTarget = e.target.closest("ul");

  if (dropTarget && dropTarget.classList.contains("tasksSection")) {
    dropTarget.appendChild(draggedElement);
    saveTasksToStorage();
  }
}

function saveTasksToStorage() {
  var tasks = [];

  for (var i = 0; i < containers.length; i++) {
    var section = containers[i];
    var lis = section.querySelectorAll("li");

    for (var j = 0; j < lis.length; j++) {
      var li = lis[j];
      tasks.push({
        id: parseInt(li.id),
        text: li.textContent,
        sectionId: section.id,
      });
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
