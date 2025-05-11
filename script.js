let input = document.getElementById("textVal");
let addBtn = document.querySelector(".add-project-btn");
let progress = document.getElementById("progress");
let tasks = [];

//prevent refresh the page on submit
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
});
// Enable drop zones to allow dropping
function dragoverFun(e) {
  e.preventDefault();
}
if (localStorage.getItem("taskslist")) {
  getTaskfromlocalSrorage();
}

addBtn.addEventListener("click", function () {
  let inputValue = input.value;
  console.log(inputValue);
  if (!inputValue) return;
  let taskObj = { id: Date.now(), text: inputValue, section: "progress" };
  tasks.push(taskObj);
  createTask(taskObj, document.getElementById(taskObj.section));
  //   console.log(taskObj.id);
  saveTolocalStorage();
  input.value = "";
  console.log(tasks);
});
// Create a task element in the given section
function createTask(taskObj, sectionElement) {
  let li = document.createElement("li");
  li.textContent = taskObj.text;
  li.id = taskObj.id;
  li.setAttribute("draggable", true);
  console.log(li);
  li.addEventListener("dragstart", dragstartFun);
  sectionElement.appendChild(li);
}
// Store the dragged item's ID
function dragstartFun(e) {
  e.dataTransfer.setData("text", e.target.id);
}
// Handle drop logic and update task's section
function dropFun(e) {
  const taskId = e.dataTransfer.getData("text");
  const draggedItem = document.getElementById(taskId);
  const targetSection = e.target.closest("ul");

  if (targetSection && draggedItem) {
    targetSection.appendChild(draggedItem);

    // Update the section in the tasks array
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == taskId) {
        tasks[i].section = targetSection.id;
        break;
      }
    }
  }
  saveTolocalStorage(); // update position
}
let dropArea = document.getElementsByClassName("tasksSection"); //ul
for (let i = 0; i < dropArea.length; i++) {
  dropArea[i].addEventListener("dragover", dragoverFun);
  dropArea[i].addEventListener("drop", dropFun);
}

function saveTolocalStorage() {
  localStorage.setItem("taskslist", JSON.stringify(tasks));
}
// Load tasks from localStorage and render them in their sections
function getTaskfromlocalSrorage() {
  tasks = JSON.parse(localStorage.getItem("taskslist"));
  for (let i = 0; i < tasks.length; i++) {
    let sectionElement = document.getElementById(tasks[i].section);

    if (sectionElement) {
      createTask(tasks[i], sectionElement);
    }
  }
}
