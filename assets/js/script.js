const openModalBtn = document.querySelector(".open-modal");
const modal = document.querySelector(".modal-container");
const addTodo = document.querySelector(".add-todo");
const dropZones = document.querySelectorAll(".drop");

function handleOpenModal() {
  modal.addEventListener("click", handleCloseModal);

  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";

  modal.removeEventListener("click", closeModal);
}

function handleCloseModal(e) {
  if (e.target.classList.contains("modal-container")) {
    closeModal();
  }
}

let containerId = 1;
function handleAddTodo() {
  const todoInput = document.querySelector(".add-todo-input");
  const container = document.createElement("div");
  const pTag = document.createElement("p");
  const icon = document.createElement("i");

  pTag.textContent = todoInput.value;

  container.className = "todo";
  icon.className = "bi bi-x";

  container.id = containerId++;

  container.draggable = true;
  container.addEventListener("dragstart", handleTodoDrag);
  icon.addEventListener("click", () => container.remove());

  container.append(pTag, icon);

  insertToDom(container);
}

function handleTodoDrag(e) {
  e.dataTransfer.setData("elementId", e.target.id);
}

function insertToDom(containerElem) {
  const todosContainer = document.querySelector(".not-status");

  todosContainer.appendChild(containerElem);
  closeModal();
}

function handleDrop(e) {
  const todoId = e.dataTransfer.getData("elementId");
  const todoElement = document.getElementById(todoId);

  if (e.target.classList.contains("drop")) {
    e.target.appendChild(todoElement);
  }
  handleDragLeave(e);
}

function handleDragLeave(e) {
  e.target.style.border = "none";
}

function handleDragEnter(e) {
  e.target.style.border = "1px dashed rgba(0,0,0,.4)";
}

addTodo.addEventListener("click", handleAddTodo);
dropZones.forEach((dropZone) => {
  dropZone.addEventListener("dragover", (e) => e.preventDefault());
  dropZone.addEventListener("drop", handleDrop);
  dropZone.addEventListener("dragenter", handleDragEnter);
  dropZone.addEventListener("dragleave", handleDragLeave);
});
openModalBtn.addEventListener("click", handleOpenModal);
