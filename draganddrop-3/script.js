const tasks = document.querySelectorAll(".task");
const taskLists = document.querySelectorAll(".task-list");

let draggedTask = null;

// Drag start & end
tasks.forEach(task => {
  task.addEventListener("dragstart", () => {
    draggedTask = task;
    setTimeout(() => {
      task.style.display = "none";
    }, 0);
  });

  task.addEventListener("dragend", () => {
    setTimeout(() => {
      task.style.display = "block";
      draggedTask = null;
    }, 0);
  });
});

// Drag over & drop
taskLists.forEach(list => {
  list.addEventListener("dragover", e => {
    e.preventDefault();
  });

  list.addEventListener("drop", () => {
    list.appendChild(draggedTask);
  });
});
