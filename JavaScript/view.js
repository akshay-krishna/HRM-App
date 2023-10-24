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

// export function displayDetails(id) {
//   getIndvData(id);
//   empIdDisplay.innerHTML = id;
//   deptDisplay.innerHTML = individualdata.department;
//   profilePhotoDisplay.src = individualdata.imageURL;
//   emailIdDisplay.innerHTML = `Email ID: ${individualdata.email}`;
//   nameDisplay.innerHTML = individualdata.fName + " " + individualdata.lName;
//   roleDisplay.innerHTML = individualdata.role;
//   dojDisplay.innerHTML = `Date of Joining: ${individualdata.doj}`;
//   dobDisplay.innerHTML = `Date of Birth: ${individualdata.dob}`;
//   phoneNoDisplay.innerHTML = `Phone Number: ${individualdata.mobile}`;
//   workingLocDisplay.innerHTML = individualdata.workLocation;
//   addressDisplay.innerHTML = `<p>${individualdata.address}</p>`;
//   showSkillsDisplay.innerHTML = "";
//   console.log("indiv", individualdata.skill);
//   individualSkill = individualdata.skill;
//   console.log("skills the selected user has ", individualSkill);
//   if (individualSkill.length == 0) {
//     showSkillsDisplay.innerHTML = "";
//   } else {
//     individualSkill.forEach((s, index) => {
//       if (index === individualSkill.length - 1)
//         showSkillsDisplay.innerHTML += `${s}`;
//       else showSkillsDisplay.innerHTML += `${s}, `;
//     });
//   }
// }
const loader = document.querySelector(".loader");

export async function displayDetails(id) {
  // Show the loader while data is being fetched
  loader.style.display = "block";

  try {
    await getIndvData(id);

    // Populate the UI with data
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
    // Hide the loader when data is available or in case of an error
    loader.style.display = "none";
  }
}
