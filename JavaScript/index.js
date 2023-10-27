const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close");
const open = document.querySelector(".open");
const addEditEmployeeModal = document.querySelector(".add-edit-employee-modal");
const addEmployee = document.querySelector(".add-employee-btn");
const skillAddSearch = document.querySelector("#skill-add-search");
const addSkillList = document.querySelector(".add-skill-list");
const closeAddEditModalIcon = document.querySelector(".close-add-edit-icon");
const filter = document.querySelector(".filter-btn");
const skillList = document.querySelector(".skill-list");
const table = document.querySelector("table");
const viewEmployeeModal = document.querySelector(".view-employee-modal");
const closeView = document.querySelector(".close-view-icon");
const confirmModal = document.querySelector(".delete-update-modal");
const cancelButton = document.querySelector(".cancel-button");

overlay.onclick = () => {
  if (
    !addEditEmployeeModal.classList.contains("close") ||
    !confirmModal.classList.contains("close")
  ) {
    console.log("Inside if");
    return;
  }
  overlay.classList.remove("open");
  skillList.classList.add("close");
  viewEmployeeModal.classList.add("close");
};

closeAddEditModalIcon.onclick = () => {
  addEditEmployeeModal.classList.add("close");
  overlay.classList.remove("open");
};

addEmployee.onclick = () => {
  overlay.classList.add("open");
  addEditEmployeeModal.classList.remove("close");
};

skillAddSearch.onfocus = () => {
  addSkillList.classList.remove("close");
};

skillAddSearch.onblur = () => {
  addSkillList.classList.add("close");
};

filter.onfocus = () => {
  skillList.classList.remove("close");
  overlay.classList.add("open");
};

function viewModal() {
  viewEmployeeModal.classList.remove("close");
}

closeView.onclick = () => {
  viewEmployeeModal.classList.add("close");
  overlay.classList.remove("open");
};

document.querySelector("table").onclick = (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === "TD") {
    // console.log(e.target.closest("tr").dataset).employeeId;
    viewModal();
    overlay.classList.add("open");
  }

  if (e.target.tagName === "IMG") {
    if (e.target.classList.contains("edit-btn")) {
      addEditEmployeeModal.classList.remove("close");
      overlay.classList.add("open");
    } else if (e.target.classList.contains("delete-btn")) {
      confirmModal.classList.remove("close");
      overlay.classList.add("open");
    }
  }
};

cancelButton.onclick = () => {
  overlay.classList.remove("open");
  confirmModal.classList.add("close");
};
