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
// import { searchElement } from "./search.js";
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
  console.log("INitial array", arr);
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
  // console.log(addedSkills);
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
      console.log("array pushed ", e.target.innerHTML);
      arr.push(e.target.innerHTML);
      console.log(("pushed array", arr));
      addSelectedSkills.classList.remove("close");
      addSelectedSkills.innerHTML += `<div class="individual-skills flex-row"><p>${e.target.innerHTML}</p><span class="material-symbols-outlined add-skills-remove">cancel</span></div>`;
      skillAddSearch.value = "";
    }
  }
};

addSelectedSkills.onclick = (e) => {
  if (e.target.classList.contains("add-skills-remove")) {
    console.log("array before if", arr);
    console.log("indarr after if", indArr);
    if (indArr.length != 0) {
      console.log("length of individual array is not 0");
      // arr = indArr;
      indArr.forEach((a) => {
        if (!arr.includes(a)) arr.push(a);
      });

      // arr.push(indArr);
      console.log("array after if ", arr);
    }
    if (arr.includes(e.target.parentNode.querySelector("p").innerHTML)) {
      // console.log("remove skills");
      let removeSkill = e.target.parentNode.querySelector("p").innerHTML;
      let indexArr = arr.indexOf(removeSkill);
      console.log("index of arr", indexArr);
      let indexInd = indArr.indexOf(removeSkill);
      console.log("index of ind", indexInd);
      console.log("skill to remove", removeSkill);
      console.log("array before splicing", arr);
      console.log("individual array before splicing", indArr);
      console.log("splicing arr", arr.splice(indexArr, 1));
      console.log("splicing ind arr ", indArr.splice(indexInd, 1));
      console.log("array after splicing", arr);
      console.log("individual array after splicing", indArr);
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
  console.log("on submit array=", arr);
  if (indArr.length != 0) {
    arr = [...indArr];
  }
  e.preventDefault();
  // console.log(addUpdateBtn.innerText == "Add Employee Profile");
  if (submitValidator()) {
    console.log(arr);
    // let img = addEmployeeImage(photoId.files[0]);
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
      // skill: arr,
      email: email.value,
      //imageURL: "",
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
      console.log(userID);

      uploadImage(photoId.files[0]).then((url) => {
        data["imageURL"] = url;
        createUser(data, userID);
        alert("Login Successful. Hi " + fname.value);
        arr = [];
        addForm.reset();
      });
    } else if (addUpdateBtn.innerText == "Update Employee Profile") {
      if (photoId.files[0]) {
        uploadImage(photoId.files[0]).then((url) => {
          data["imageURL"] = url;
          console.log("updated skills with foto change", data.skill);
          updateUser(data, editUserId);
          arr = [];
          blank();
          addForm.reset();
        });
      } else {
        console.log("updated skills without foto change", data.skill);
        updateUser(data, editUserId);
        arr = [];
        blank();
        addForm.reset();
      }
      // console.log("updated data", data, "for", editUserId);
      // console.log("updated skills", data.skill);
      updateUser(data, editUserId);
      arr = [];
      blank();
      addForm.reset();
    }

    addEditEmployeeModal.classList.add("close");
    overlay.classList.remove("open");
    addSelectedSkills.innerHTML = "";

    // console.log(uploadImage(photoId.files[0]));

    // console.log("data skill", data.skill);
    // console.log(actualData);

    // let len = actualData.length;
    // if (!len) {
    //   userID = 1001;
    // } else {
    //   userID = Number(actualData[len - 1].id) + 1;
    // }
    // createUser(data, userID);
    // alert("Login Successful. Hi " + fname.value);
    // addForm.reset();

    // err.forEach((errors) => {
    //   errors.innerHTML = "Error Placeholder";
    //   errors.classList.remove("visible");
    // });
  } else {
    // alert("failed");
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
      profilePhoto.style.borderRadius = "50%";
      editModal(editUserId);
      addEditEmployeeModal.classList.remove("close");
      overlay.classList.add("open");
    } else if (e.target.classList.contains("delete-btn")) {
      // console.log(e.target.parentElement.firstElementChild.dataset.employeeId);
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

// uploadImage(photoId.files[0]).then((url) => {
//   data["imageURL"] = url;
//   if (arr.length == 0) {
//     data.skill = "";
//     console.log(data.skill);
//   } else {
//     data.skill = arr;
//   }
//   if (addUpdateBtn.innerText == "Add Employee Profile") {
//     let len = actualData.length;
//     if (!len) {
//       userID = 1001;
//     } else {
//       userID = Number(actualData[len - 1].id) + 1;
//     }
//     console.log(userID);
//     createUser(data, userID);
//     alert("Login Successful. Hi " + fname.value);
//     arr = [];
//     addForm.reset();
//   } else {
//     // console.log("updated data", data, "for", editUserId);
//     // console.log("updated skills", data.skill);
//     updateUser(data, editUserId);
//     arr = [];
//     blank();
//     addForm.reset();
//   }

//   addEditEmployeeModal.classList.add("close");
//   overlay.classList.remove("open");
//   addSelectedSkills.innerHTML = "";
// });
