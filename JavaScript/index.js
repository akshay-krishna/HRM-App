import {
  renderDept,
  renderLocation,
  renderRole,
  renderSkills,
  renderTable,
} from "./UI.js";
import { blank, editModal, indArr } from "./editModal.js";
import {
  createUser,
  deleteUser,
  getDept,
  getLocation,
  getRole,
  getSkills,
  getUser,
  updateUser,
  uploadImage,
} from "./firebase.js";
import { alterTable } from "./list.js";
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
export const search = document.getElementById("search");
const searchForm = document.querySelector(".search-form");
const addEditEmployeeModal = document.querySelector(".add-edit-employee-modal");
const addEmployee = document.querySelector(".add-employee-btn");
const photoId = document.getElementById("photo-id");
export const profilePhoto = document.querySelector(".add-edit-profile-photo");
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
const viewEmployeeModal = document.querySelector(".view-employee-modal");
const closeView = document.querySelector(".close-view-icon");
const confirmModal = document.querySelector(".delete-update-modal");
const cancelButton = document.querySelector(".cancel-button");
const addForm = document.querySelector(".add-edit-employee-form");
const err = document.querySelectorAll(".err");
const addUpdateBtn = document.querySelector(".add-update-btn");
const toast = document.querySelector(".toast");
const toastText = document.querySelector(".toast-text");
export let arrow;
export let actualData = [];
let arr = [];
export let skillsArr = [];
let addedSkills = [];
export let editUserId;
let userID;

document.addEventListener("DOMContentLoaded", () => {
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
  document
    .querySelector(".profile-photo-view")
    .setAttribute("src", "assets/images/loader.gif");
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
  profilePhoto.setAttribute("src", "assets/images/add-profile-photo.svg");
  addForm.reset();
  addEditEmployeeModal.classList.add("close");
  overlay.classList.remove("open");
  addSelectedSkills.innerHTML = "";
  arr = [];
};

addEmployee.onclick = () => {
  arr = [];
  document.querySelector(".add-edit-heading").innerHTML = "Add Employee";
  document.querySelector(".add-update-text").innerHTML = "Add Employee Profile";
  profilePhoto.setAttribute("src", "assets/images/add-profile-photo.svg");
  profilePhoto.style.borderRadius = "0";
  err.forEach((errors) => {
    errors.innerHTML = "Error Placeholder";
    errors.classList.remove("visible");
  });
  addForm.reset();
  overlay.classList.add("open");
  addEditEmployeeModal.classList.remove("close");
  addEditEmployeeModal.scrollTop = 0;
};

photoId.oninput = () => {
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
  addedSkills = addedSkills.filter((indSkill) =>
    indSkill.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderSkills(addedSkills);
};

addSkillList.onclick = (e) => {
  if (e.target.tagName === "LI") {
    if (indArr.length != 0) {
      arr = [...indArr];
    }
    if (!arr.includes(e.target.innerHTML)) {
      arr.push(e.target.innerHTML);
      indArr.push(e.target.innerHTML);
      addSelectedSkills.classList.remove("close");
      addSelectedSkills.innerHTML += `<div class="individual-skills flex-row"><p>${e.target.innerHTML}</p><span class="material-symbols-outlined add-skills-remove">cancel</span></div>`;
      skillAddSearch.value = "";
    }
  }
};

addSelectedSkills.onclick = (e) => {
  if (e.target.classList.contains("add-skills-remove")) {
    if (indArr.length != 0) {
      indArr.forEach((a) => {
        if (!arr.includes(a)) arr.push(a);
      });
    }
    if (arr.includes(e.target.parentNode.querySelector("p").innerHTML)) {
      let removeSkill = e.target.parentNode.querySelector("p").innerHTML;
      let indexArr = arr.indexOf(removeSkill);
      let indexInd = indArr.indexOf(removeSkill);
      arr.splice(indexArr, 1);
      indArr.splice(indexInd, 1);
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
  skillList.classList.remove("close");
  getSkills((dataArr) => {
    skillsArr = dataArr;
    renderSkills(dataArr);
  });
});

filter.addEventListener("blur", (e) => {
  setTimeout(() => {
    e.target.value = "";
    skillList.scrollTop = 0;
    skillList.classList.add("close");
  }, 200);
});

addForm.onsubmit = (e) => {
  if (indArr.length != 0) {
    arr = [...indArr];
  }
  e.preventDefault();
  if (submitValidator()) {
    const date = new Date();
    let data = {
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
      email: email.value,
    };

    if (arr.length == 0) {
      data.skill = "";
    } else {
      data.skill = arr;
    }

    if (addUpdateBtn.innerText == "Add Employee Profile") {
      let len = actualData.length;
      if (!len) {
        userID = 1001;
      } else {
        userID = Number(actualData[len - 1].id) + 1;
      }

      uploadImage(photoId.files[0]).then((url) => {
        data["imageURL"] = url;
        createUser(data, userID);
        toastText.innerHTML = "Employee details added successfully";
        toast.classList.add("show");
        arr = [];
        blank();
        removeShow();
        addForm.reset();
      });
    } else if (addUpdateBtn.innerText == "Update Employee Profile") {
      if (photoId.files[0]) {
        uploadImage(photoId.files[0]).then((url) => {
          data["imageURL"] = url;
          updateUser(data, editUserId);
          toastText.innerHTML = "Employee details updated successfully";
          toast.classList.add("show");
          arr = [];
          blank();
          removeShow();
          addForm.reset();
        });
      } else {
        updateUser(data, editUserId);
        toastText.innerHTML = "Employee details updated successfully";
        arr = [];
        blank();
        toast.classList.add("show");
        removeShow();
        addForm.reset();
      }
      updateUser(data, editUserId);
      arr = [];
      blank();
      addForm.reset();
    }

    addEditEmployeeModal.classList.add("close");
    overlay.classList.remove("open");
    addSelectedSkills.innerHTML = "";
  }
};

function viewModal(id) {
  document
    .querySelector(".profile-photo-view")
    .setAttribute("src", "assets/images/loader.gif");
  viewEmployeeModal.classList.remove("close");
  displayDetails(id);
}

closeView.onclick = () => {
  document
    .querySelector(".profile-photo-view")
    .setAttribute("src", "assets/images/loader.gif");
  viewEmployeeModal.classList.add("close");
  overlay.classList.remove("open");
};

document.querySelector("table").onclick = (e) => {
  if (e.target.tagName === "TD") {
    viewModal(e.target.parentElement.dataset.employeeId);
    overlay.classList.add("open");
  } else if (e.target.closest("div").dataset.column) {
    arrow = e.target.closest("div").querySelector(".arrow");
    sortColumn(e.target.closest("div").dataset.column);
  } else if (e.target.tagName === "IMG") {
    if (e.target.classList.contains("edit-btn")) {
      editUserId = e.target.parentElement.firstElementChild.dataset.employeeId;
      profilePhoto.style.borderRadius = "50%";
      editModal(editUserId);
      addEditEmployeeModal.classList.remove("close");
      overlay.classList.add("open");
    } else if (e.target.classList.contains("delete-btn")) {
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
  overlay.classList.remove("open");
  confirmModal.classList.add("close");
};

function removeShow() {
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
