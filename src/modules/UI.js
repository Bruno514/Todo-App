import Storage from "./Storage";
import { format } from "date-fns";

const storage = Storage();

export default function UI() {
  function setupEventHandlers() {
    const ADDPROJECTBUTTON = document.querySelector(
      ".projects-dropdown .add-btn"
    );
    ADDPROJECTBUTTON.addEventListener("click", (event) => {
      const projectPopup = document.querySelector("[data-modal-project]");
      projectPopup.showModal();

      // This event listener is added once so it gets destroyed after
      // submiting the form.
      const projectPopupForm = projectPopup.querySelector("form");

      // Remove previous ones, in case the person was trying to edit but did not submit (which keeps the listener)
      // or if they may have closed while adding one
      projectPopupForm.removeEventListener("click", addProject);
      projectPopupForm.removeEventListener("click", editProject);
      projectPopupForm.addEventListener("submit", addProject, { once: true });
    });

    const EDITPROJECTBUTTON = document.querySelector(
      ".projects-dropdown .edit-btn"
    );
    EDITPROJECTBUTTON.addEventListener("click", (event) => {
      const projectPopup = document.querySelector("[data-modal-project]");
      projectPopup.showModal();

      projectPopup.querySelector("#title").value =
        storage.getSelectedProject().name;
      projectPopup.querySelector("#description").value =
        storage.getSelectedProject().desc;

      // This event listener is added once so it gets destroyed after
      // submiting the form.
      const projectPopupForm = projectPopup.querySelector("form");
      // Remove previous ones, in case the person was trying to edit but did not submit (which keeps the listener)
      // or if they may have closed while adding one
      projectPopupForm.removeEventListener("click", addProject);
      projectPopupForm.removeEventListener("click", editProject);

      projectPopupForm.addEventListener("submit", editProject, { once: true });
    });

    const DELETEPROJECTBUTTON = document.querySelector(
      ".projects-dropdown .del-btn"
    );
    DELETEPROJECTBUTTON.addEventListener("click", deleteProject);

    const SELECTPROJECT = document.querySelector("select#projects");
    SELECTPROJECT.addEventListener("change", (event) => {
      storage.setSelectedProject(event.target.value);
      loadProject();
    });

    const ADDTASKBUTTON = document.querySelector(".tasks-action .add-btn");
    ADDTASKBUTTON.addEventListener("click", (event) => {
      const taskPopup = document.querySelector("[data-modal-task]");
      taskPopup.showModal();

      // This event listener is added once so it gets destroyed after
      // submiting the form, leaving an option for the "edit event listener"
      const taskPopupForm = taskPopup.querySelector("form");
      taskPopupForm.addEventListener("submit", addTask, { once: true });
    });
  }

  function initialize() {
    setupEventHandlers();
    loadProject();
    updateOptions();
  }

  function addProject(event) {
    event.preventDefault();
    console.log(1);

    const projectPopup = document.querySelector("[data-modal-project]");
    const title = projectPopup.querySelector("#title").value;
    const desc = projectPopup.querySelector("#description").value;

    storage.addProject(title, desc);
    projectPopup.close();

    updateOptions();
    loadProject();
  }

  function editProject(event) {
    event.preventDefault();

    editProject();

    projectPopup.close();
    event.target.reset();

    updateOptions();
  }

  function deleteProject() {
    storage.deleteProject();
    updateOptions();
    loadProject();
  }

  function addTask(event) {
    event.preventDefault();
    const taskPopup = document.querySelector("[data-modal-task]");

    const title = taskPopup.querySelector("#title").value;
    const desc = taskPopup.querySelector("#description").value;
    const dueDate = taskPopup.querySelector("#due-date").value;
    const priority = taskPopup.querySelector("#priority").value;

    const dateParts = dueDate.split("-");
    const dueDateConverted = new Date(
      dateParts[0], // Year
      dateParts[1] - 1, // Month
      dateParts[2] // Day
    );

    storage.addTask(title, desc, dueDateConverted, priority);
    taskPopup.close();

    loadProject();
  }

  function editTask(id) {
    const taskPopup = document.querySelector("[data-modal-task]");

    const title = taskPopup.querySelector("#title").value;
    const desc = taskPopup.querySelector("#description").value;
    const dueDate = taskPopup.querySelector("#due-date").value;
    const priority = taskPopup.querySelector("#priority").value;

    storage.editTask(id, title, desc, dueDate, priority);
  }

  function updateOptions() {
    // Clear options first
    document.querySelector("select#projects").textContent = "";

    storage.getAllProjects().forEach((element) => {
      const option = document.createElement("option");
      option.value = element.id;
      option.textContent = element.name;

      document.querySelector("select#projects").appendChild(option);
    });

    document.querySelector("select#projects").value =
      storage.getSelectedProject().id;
  }

  function loadProject() {
    // Clear the table first
    const toDelete = Array.from(document.querySelectorAll("tr")).slice(1);
    toDelete.forEach((element) => {
      element.remove();
    });

    const project = storage.getSelectedProject();
    const table = document.querySelector("table");

    project.tasks.forEach((task) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td class="task-title">${task.title}</td>
      <td class="task-dueDate">${format(task.dueDate, "dd/MM/yyyy")}</td>
      <td class="task-priority">${task.priority}</td>
      <td class="task-action">
        <button class="act-btn edit-btn"><span class="iconify" data-icon="akar-icons:edit"></span></button>
        <button class="act-btn del-btn"><span class="iconify act-btn del-btn" data-icon="material-symbols:delete-outline"></span></button>
        <input type="checkbox" class="act-btn complete-btn"/>
      </td>
      `;

      // Event Listeners
      tr.querySelector(".edit-btn").addEventListener("click", (event) => {
        const taskPopup = document.querySelector("[data-modal-task]");

        taskPopup.querySelector("#title").value = task.title;
        taskPopup.querySelector("#description").value = task.description;
        taskPopup.querySelector("#due-date").value = task.dueDate;
        taskPopup.querySelector("#priority").value = task.priority;

        taskPopup.showModal();

        taskPopup.querySelector("form").addEventListener(
          "submit",
          (event) => {
            event.preventDefault();
            editTask(task.id);
            taskPopup.close();
            loadProject();
            event.target.reset();
          },
          { once: true }
        );
      });

      tr.querySelector(".del-btn").addEventListener("click", (event) => {
        storage.deleteTask(task.id);
        loadProject();
      });

      tr.querySelector(".complete-btn").addEventListener("click", (event) => {
        storage.completeTask(task.id);
        event.target.checked = 1;
        loadProject();
      });

      if (task.isCompleted) {
        tr.classList.add("completed");
        const checkbox = tr.querySelector("input");
        checkbox.checked = 1;
      }

      tr.dataset.id = task.id;

      table.appendChild(tr);
    });
  }

  loadTasks

  return { initialize };
}
