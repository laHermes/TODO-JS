const form = document.querySelector("#task-form");
const taskName = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
  taskList.addEventListener("click", removeTask);
}

function getTasks() {
  let tasks;
  let localStorages = localStorage.getItem("tasks");

  if (localStorages === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorages);
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskName.value === "") {
    alert("Please enter a task");
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskName.value));
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  persistToLocalStorage(taskName.value);

  taskName.value = "";

  e.preventDefault();
}

function persistToLocalStorage(task) {
  let tasks;
  let localStorages = localStorage.getItem("tasks");

  if (localStorages === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorages);
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }

  removeTaskFromLocalStorage(e.target.parentElement.parentElement);

  e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  let localStorages = localStorage.getItem("tasks");

  if (localStorages === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorages);
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearLocalStorage();
}

function clearLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document
    .querySelectorAll(".collection-item")
    .forEach(function (tasks, index) {
      const item = tasks.firstChild.textContent.toLowerCase();

      if (item.indexOf(text) !== -1) {
        tasks.style.display = "block";
      } else {
        tasks.style.display = "none";
      }
    });
}
