document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");
  const resetTasksButton = document.getElementById("reset-tasks");
  chrome.storage.sync.get(["tasks"], (result) => {
    const tasks = result.tasks || [];
    tasks.forEach((task) => addTaskToDOM(task));
    toggleResetButton(tasks.length > 0);
  });
  addTaskButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
      chrome.storage.sync.get(["tasks"], (result) => {
        const tasks = result.tasks || [];
        tasks.push({ text: task }); 
        chrome.storage.sync.set({ tasks }, () => {
          addTaskToDOM({ text: task });
          taskInput.value = "";
          toggleResetButton(true);
        });
      });
    } else {
      displayValidationError();
    }
  });
  function addTaskToDOM(task) {
    const taskText = typeof task === "object" ? task.text : task;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${taskText}</span>
      <div>
        <button class="btn btn-danger btn-sm delete-task">
          <i class="bi bi-trash"></i>
        </button>
      </div>`;
    li.querySelector(".delete-task").addEventListener("click", () => {
      li.remove();
      chrome.storage.sync.get(["tasks"], (result) => {
        const tasks = result.tasks || [];
        const updatedTasks = tasks.filter((t) => t.text !== taskText);
        chrome.storage.sync.set({ tasks: updatedTasks }, () => {
          toggleResetButton(updatedTasks.length > 0);
        });
      });
    });
    taskList.appendChild(li);
  }
  resetTasksButton.addEventListener("click", () => {
    chrome.storage.sync.set({ tasks: [] }, () => {
      taskList.innerHTML = "";
      toggleResetButton(false);
    });
  });
  function toggleResetButton(show) {
    resetTasksButton.style.display = show ? "block" : "none";
  }
  function displayValidationError() {
    taskInput.classList.add("is-invalid");
    setTimeout(() => {
      taskInput.classList.remove("is-invalid");
    }, 2000);
  }
});