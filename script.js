var input = document.querySelector("#textVal");
var addBtn = document.querySelector(".add-project-btn");
var inProgress = document.querySelector("#progress"); //progress ul
var containers = document.querySelectorAll(".tasksSection"); //ul

var index = 0;
document.querySelector("#form").addEventListener("submit", function (e) {
  e.preventDefault();
});
function dragOver(e) {
  e.preventDefault();
}
addBtn.addEventListener("click", function () {
  var inputValue = input.value;
  console.log(inputValue);
  if (!inputValue) return;
  createTask(inputValue);
  //reset input
  input.value = "";
});

function createTask(inputValue) {
  var li = document.createElement("li");
  li.setAttribute("draggable", "true");
  li.id = index++;
  console.log(li.id);
  li.addEventListener("dragstart", dragStart);
  li.textContent = inputValue;
  inProgress.appendChild(li);
}
for (var i = 0; i < containers.length; i++) {
  containers[i].addEventListener("dragover", dragOver);
  containers[i].addEventListener("drop", drop);
}

function dragStart(e) {
  console.log("item drag start");
  e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
  e.preventDefault();
  console.log(e.dataTransfer.getData("text")); //id
  const data = e.dataTransfer.getData("text"); //id
  //containers[i]
  e.target.appendChild(document.getElementById(data)); //li
}
function createList() {
  var taskList = [];

  for (var i = 0; i < containers.length; i++) {
    var taskData = {
      section: containers[i],
      id: section.id,
    };
    taskList.push(taskData);
    saveTasksToStorage();
  }
}

function saveTasksToStorage(taskList) {
  for (var i = 0; i < taskList.length; i++) {
    localStorage.setItem("tasksList", JSON.stringify(taskList));
  }
}
