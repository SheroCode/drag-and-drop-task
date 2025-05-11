let input = document.getElementById("textVal");
let addBtn = document.querySelector(".add-project-btn");
let tasks = [];
let index = 0;
addBtn.addEventListener("click", function () {
  let inputValue = input.value;
  if (inputValue === "") {
    return;
  }
  let taskObj = { id: index++, text: inputValue };
  tasks.push(taskObj);
  console.log(tasks);
  console.log(taskObj.id);
  input.value = "";
});
