import {
  renderDept,
  renderLocation,
  renderRole,
  renderSkills,
  renderTable,
} from "./UI.js";
import { editModal, indArr } from "./editModal.js";
import {
  createUser,
  deleteUser,
  getDept,
  getLocation,
  getRole,
  getSkills,
  getUser,
  updateUser,
} from "./firebase.js";
import { alterTable } from "./list.js";
import { searchElement } from "./search.js";
import { sortColumn } from "./sort.js";
import {
  dob,
  email,
  fname,
  lname,
  phoneNumber,
  submitValidator,
  address,
} from "./validation.js";
import { displayDetails } from "./view.js";
const overlay = document.querySelector(".overlay");
// const close = document.querySelector(".close");
// const open = document.querySelector(".open");
export const search = document.getElementById("search");
const searchForm = document.querySelector(".search-form");
const addEditEmployeeModal = document.querySelector(".add-edit-employee-modal");
const addEmployee = document.querySelector(".add-employee-btn");
const photoId = document.getElementById("photo-id");
const profilePhoto = document.querySelector(".add-edit-profile-photo");
export const skillAddSearch = document.querySelector("#skill-add-search");
const addSkillList = document.querySelector(".add-skill-list");
const addRoleList = document.querySelector(".add-role-list");
const role = document.querySelector("#role");
const addDeptList = document.querySelector(".add-department-list");
const dept = document.querySelector("#department");
const addLocationList = document.querySelector(".add-location-list");
export const location = document.querySelector("#location");
const closeAddEditModalIcon = document.querySelector(".close-add-edit-icon");
const filter = document.querySelector(".filter-search");
const skillList = document.querySelector(".skill-list");
export const addSelectedSkills = document.querySelector(".add-selected-skills");
const deleteButton = document.querySelector(".delete-button");
// const addSkillsRemove = document.querySelector(".add-skills-remove");
// const table = document.querySelector("table");
const viewEmployeeModal = document.querySelector(".view-employee-modal");
const closeView = document.querySelector(".close-view-icon");
const confirmModal = document.querySelector(".delete-update-modal");
const cancelButton = document.querySelector(".cancel-button");
const addForm = document.querySelector(".add-edit-employee-form");
const err = document.querySelectorAll(".err");
const addUpdateBtn = document.querySelector(".add-update-btn");
export let arrow;
export let actualData = [];
let arr = [];
export let skillsArr = [];
let addedSkills = [];
export let editUserId;
let userID;

document.addEventListener("DOMContentLoaded", () => {
  // console.log("dom content loaded");
  getUser((dataArr) => {
    actualData = dataArr;
    renderTable(dataArr);
  });
});

searchForm.onsubmit = (e) => {
  e.preventDefault();
};

search.oninput = () => {
  alterTable();
};

overlay.onclick = () => {
  if (
    !addEditEmployeeModal.classList.contains("close") ||
    !confirmModal.classList.contains("close")
  ) {
    return;
  }
  overlay.classList.remove("open");
  skillList.scrollTop = 0;
  skillList.classList.add("close");
  viewEmployeeModal.classList.add("close");
  addRoleList.classList.add("close");
  addDeptList.classList.add("close");
  addLocationList.classList.add("close");
};

closeAddEditModalIcon.onclick = () => {
  err.forEach((errors) => {
    errors.innerHTML = "Error Placeholder";
    errors.classList.remove("visible");
  });
  profilePhoto.style.borderRadius = "0";
  profilePhoto.setAttribute("src", "assets/images/add-profile-photo.svg");
  addForm.reset();
  addEditEmployeeModal.classList.add("close");
  overlay.classList.remove("open");
  addSelectedSkills.innerHTML = "";
};

addEmployee.onclick = () => {
  document.querySelector(".add-edit-heading").innerHTML = "Add Employee";
  document.querySelector(".add-update-text").innerHTML = "Add Employee Profile";
  addForm.reset();
  overlay.classList.add("open");
  addEditEmployeeModal.classList.remove("close");
  addEditEmployeeModal.scrollTop = 0;
  arr = [];
};

photoId.onchange = () => {
  if (photoId.files[0]) {
    profilePhoto.style.borderRadius = "50%";
    profilePhoto.setAttribute("src", URL.createObjectURL(photoId.files[0]));
  }
};

skillAddSearch.onfocus = () => {
  addSkillList.classList.remove("close");
  getSkills((dataArr) => {
    skillsArr = dataArr;
    renderSkills(dataArr);
  });
};

skillAddSearch.oninput = (e) => {
  if (e.target.value === "") {
    addedSkills = [];
  }
  addedSkills = [...skillsArr];
  console.log(addedSkills);
  addedSkills = addedSkills.filter((indSkill) =>
    indSkill.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderSkills(addedSkills);
};

addSkillList.onclick = (e) => {
  if (e.target.tagName === "LI") {
    if (!arr.includes(e.target.innerHTML)) {
      arr.push(e.target.innerHTML);
      addSelectedSkills.classList.remove("close");
      addSelectedSkills.innerHTML += `<div class="individual-skills flex-row"><p>${e.target.innerHTML}</p><span class="material-symbols-outlined add-skills-remove">cancel</span></div>`;
      skillAddSearch.value = "";
    }
  }
};

addSelectedSkills.onclick = (e) => {
  if (e.target.classList.contains("add-skills-remove")) {
    console.log("array", arr);
    console.log("indarr", indArr);
    if (indArr.length != 0) {
      arr = indArr;
    }
    if (arr.includes(e.target.parentNode.querySelector("p").innerHTML)) {
      console.log("remove skills");
      let index = arr.indexOf(e.target.parentNode.querySelector("p").innerHTML);
      arr.splice(index, 1);
      addSelectedSkills.innerHTML = "";
      if (arr.length == 0) {
        addSelectedSkills.innerHTML = "";
        addSelectedSkills.classList.remove("close");
      } else {
        arr.forEach((data) => {
          addSelectedSkills.innerHTML += `<div class="individual-skills flex-row"><p>${data}</p><span class="material-symbols-outlined add-skills-remove">cancel</span></div>`;
        });
      }
    }
  }
};

skillAddSearch.onblur = () => {
  setTimeout(() => {
    addSkillList.scrollTop = 0;
    addSkillList.classList.add("close");
  }, 200);
};

role.onfocus = () => {
  addRoleList.classList.remove("close");
  getRole((dataArr) => {
    renderRole(dataArr);
  });
};

addRoleList.onclick = (e) => {
  if (e.target.tagName === "LI") {
    role.value = e.target.innerHTML;
  }
};

role.onblur = () => {
  setTimeout(() => {
    addRoleList.scrollTop = 0;
    addRoleList.classList.add("close");
  }, 200);
};

dept.onfocus = () => {
  addDeptList.classList.remove("close");
  getDept((dataArr) => {
    renderDept(dataArr);
  });
};

addDeptList.onclick = (e) => {
  if (e.target.tagName === "LI") {
    dept.value = e.target.innerHTML;
  }
};

dept.onblur = () => {
  setTimeout(() => {
    addDeptList.scrollTop = 0;
    addDeptList.classList.add("close");
  }, 200);
};

location.onfocus = () => {
  overlay.classList.add("open");
  addLocationList.classList.remove("close");
  getLocation((dataArr) => {
    renderLocation(dataArr);
  });
};

addLocationList.onclick = (e) => {
  if (e.target.tagName === "LI") {
    location.value = e.target.innerHTML;
  }
};

location.onblur = () => {
  setTimeout(() => {
    addLocationList.scrollTop = 0;
    addLocationList.classList.add("close");
  }, 200);
};

filter.addEventListener("focus", () => {
  // console.log("on focusd");
  skillList.classList.remove("close");
  getSkills((dataArr) => {
    skillsArr = dataArr;
    renderSkills(dataArr);
  });
  // overlay.classList.add("open");
});

filter.addEventListener("blur", (e) => {
  setTimeout(() => {
    e.target.value = "";
    skillList.scrollTop = 0;
    skillList.classList.add("close");
  }, 200);
});

addForm.onsubmit = (e) => {
  e.preventDefault();
  // console.log(addUpdateBtn.innerText == "Add Employee Profile");
  if (submitValidator()) {
    // console.log(arr);
    const date = new Date();
    const data = {
      fName: fname.value,
      lName: lname.value,
      department: dept.value,
      workLocation: location.value,
      role: role.value,
      dob: dob.value,
      doj: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
      address: address.value,
      mobile: phoneNumber.value,
      department: dept.value,
      skill: arr,
      email: email.value,
      imageURL: "",
    };
    // console.log(actualData);
    if (addUpdateBtn.innerText == "Add Employee Profile") {
      let len = actualData.length;
      if (!len) {
        userID = 1001;
      } else {
        userID = Number(actualData[len - 1].id) + 1;
      }
      createUser(data, userID);
      alert("Login Successful. Hi " + fname.value);
      addForm.reset();
    } else {
      console.log("updated data", data, "for", editUserId);
      console.log("updated skills", data.skill);
      updateUser(data, editUserId);
    }
    // let len = actualData.length;
    // if (!len) {
    //   userID = 1001;
    // } else {
    //   userID = Number(actualData[len - 1].id) + 1;
    // }
    // createUser(data, userID);
    // alert("Login Successful. Hi " + fname.value);
    // addForm.reset();
    addEditEmployeeModal.classList.add("close");
    overlay.classList.remove("open");
    addSelectedSkills.innerHTML = "";
    err.forEach((errors) => {
      errors.innerHTML = "Error Placeholder";
      errors.classList.remove("visible");
    });
  } else {
    // alert("failed");
  }
};

function viewModal(id) {
  viewEmployeeModal.classList.remove("close");
  displayDetails(id);
}

closeView.onclick = () => {
  viewEmployeeModal.classList.add("close");
  overlay.classList.remove("open");
};

document.querySelector("table").onclick = (e) => {
  // console.log(e.target, e.target.closest("div"));
  if (e.target.tagName === "TD") {
    // console.log(e.target.parentElement.dataset.employeeId);
    viewModal(e.target.parentElement.dataset.employeeId);
    overlay.classList.add("open");
  } else if (e.target.closest("div").dataset.column) {
    arrow = e.target.closest("div").querySelector(".arrow");
    // console.log(e.target, arrow);
    sortColumn(e.target.closest("div").dataset.column);
  } else if (e.target.tagName === "IMG") {
    if (e.target.classList.contains("edit-btn")) {
      editUserId = e.target.parentElement.firstElementChild.dataset.employeeId;
      editModal(editUserId);
      addEditEmployeeModal.classList.remove("close");
      overlay.classList.add("open");
    } else if (e.target.classList.contains("delete-btn")) {
      console.log(e.target.parentElement.firstElementChild.dataset.employeeId);
      confirmModal.classList.remove("close");
      overlay.classList.add("open");
      deleteButton.onclick = () => {
        deleteUser(e.target.parentElement.firstElementChild.dataset.employeeId);
        confirmModal.classList.add("close");
        overlay.classList.remove("open");
      };
    }
  }
};

cancelButton.onclick = () => {
  // console.log("canceled");
  overlay.classList.remove("open");
  confirmModal.classList.add("close");
};
