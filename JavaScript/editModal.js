import { getIndvData, individualdata } from "./firebase.js";
import { addSelectedSkills, location, profilePhoto } from "./index.js";
import {
  address,
  department,
  dob,
  email,
  fname,
  lname,
  phoneNumber,
  role,
} from "./validation.js";
export let indArr = [];
let individualSkill;

export function blank() {
  indArr = [];
}
export function editModal(empId) {
  indArr = [];
  getIndvData(empId);
  document.getElementById("photo-id").src = "assets/images/loader.gif";
  document.querySelector(".add-edit-heading").innerHTML = "Edit Employee";
  document.querySelector(".add-update-text").innerHTML =
    "Update Employee Profile";
  profilePhoto.src = individualdata.imageURL;
  fname.value = individualdata.fName;
  lname.value = individualdata.lName;
  role.value = individualdata.role;
  department.value = individualdata.department;
  location.value = individualdata.workLocation;
  email.value = individualdata.email;
  dob.value = individualdata.dob;
  phoneNumber.value = individualdata.mobile;
  address.value = individualdata.address;
  individualSkill = individualdata.skill;
  if (individualSkill == "") {
    addSelectedSkills.innerHTML = "";
  } else {
    individualSkill.forEach((element) => {
      indArr.push(element);
      addSelectedSkills.classList.remove("close");
      addSelectedSkills.innerHTML += `<div class="individual-skills flex-row"><p>${element}</p><span class="material-symbols-outlined add-skills-remove">cancel</span></div>`;
    });
  }
}
