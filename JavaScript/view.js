import { getIndvData, individualdata } from "./firebase.js";

const profilePhotoDisplay = document.querySelector(".profile-photo-view");
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
let individualSkill;

const loader = document.querySelector(".loader");

export async function displayDetails(id) {
  loader.style.display = "block";

  try {
    await getIndvData(id);

    empIdDisplay.innerHTML = id;
    deptDisplay.innerHTML = individualdata.department;
    profilePhotoDisplay.src = individualdata.imageURL;
    emailIdDisplay.innerHTML = `Email ID: ${individualdata.email}`;
    nameDisplay.innerHTML = individualdata.fName + " " + individualdata.lName;
    roleDisplay.innerHTML = individualdata.role;
    dojDisplay.innerHTML = `Date of Joining: ${individualdata.doj}`;
    dobDisplay.innerHTML = `Date of Birth: ${individualdata.dob}`;
    phoneNoDisplay.innerHTML = `Phone Number: ${individualdata.mobile}`;
    workingLocDisplay.innerHTML = individualdata.workLocation;
    addressDisplay.innerHTML = `<p>${individualdata.address}</p>`;
    showSkillsDisplay.innerHTML = "";

    individualSkill = individualdata.skill;

    if (individualSkill.length === 0) {
      showSkillsDisplay.innerHTML = "";
    } else {
      individualSkill.forEach((s, index) => {
        if (index === individualSkill.length - 1)
          showSkillsDisplay.innerHTML += `${s}`;
        else showSkillsDisplay.innerHTML += `${s}, `;
      });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loader.style.display = "none";
  }
}
