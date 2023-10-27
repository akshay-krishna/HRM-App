import { getIndvData, individualdata } from "./firebase.js";

const profilePhotoDisplay = document.querySelector(".profile-photo-circle");
const empIdDisplay = document.querySelector(".emp-id-display");
const deptDisplay = document.querySelector(".dept-display");
const emailIdDisplay = document.querySelector(".emailID-display");
const nameDisplay = document.querySelector(".name-display");
const roleDisplay = document.querySelector(".role-display");
const dojDisplay = document.querySelector(".doj-display");
const dobDisplay = document.querySelector(".dob-display");
const phoneNoDisplay = document.querySelector(".phone-no-display");
const workingLocDisplay = document.querySelector(".working-location-display");
const addressDisplay = document.querySelector(".address-display");
const showSkillsDisplay = document.querySelector(".show-skills-p");

export function displayDetails(id) {
  getIndvData(id);
  empIdDisplay.innerHTML = id;
  deptDisplay.innerHTML = individualdata.department;
  emailIdDisplay.innerHTML = individualdata.email;
  nameDisplay.innerHTML = individualdata.fName + " " + individualdata.lName;
  roleDisplay.innerHTML = individualdata.role;
  dojDisplay.innerHTML = `Date of Joining: ${individualdata.doj}`;
  dobDisplay.innerHTML = `Date of Birth: ${individualdata.dob}`;
  phoneNoDisplay.innerHTML = `Phone Number: ${individualdata.mobile}`;
  workingLocDisplay.innerHTML = `Location: ${individualdata.workLocation}`;
  addressDisplay.innerHTML = `<p>${individualdata.address}</p>`;
  showSkillsDisplay.innerHTML = "";
  // console.log("indiv",individualdata.skill);
  individualdata.skill.forEach((s, index) => {
    if (index === individualdata.skill.length - 1)
      showSkillsDisplay.innerHTML += `${s}`;
    else showSkillsDisplay.innerHTML += `${s}, `;
  });
}
