import { getSkills, getUser, userArr } from "./firebase.js";
import { renderSkills, renderTable, skillShow } from "./UI.js";
import { actualData, search, skillsArr } from "./index.js";
export let filterArr = [];
export const selected = document.querySelector(".selected-skills ");
const skillUl = document.querySelector(".skill-list");
export const searchFilter = document.querySelector(".search-filter");
const filterShow = document.querySelector(".filter-search");
// let filterData = [];
let dataSkills = [];
export let filterArray = [];

skillUl.onclick = (e) => {
  if (e.target.tagName === "LI") {
    // console.log(e.target.tagName);
    skillAdd(e.target);
  }
};

export function skillAdd(value) {
  dataSkills = [];
  getSkills((dataArr) => {
    dataSkills = dataArr;
  });
  dataSkills.forEach((data) => {
    if (data.name == value.innerHTML && !filterArr.includes(data.name)) {
      filterArr.push(data.name);
      skillShow(data.name);
    }
  });
}

selected.onclick = (e) => {
  if (e.target.classList.contains("cancel")) {
    if (filterArr.includes(e.target.parentNode.querySelector("p").innerHTML)) {
      let index = filterArr.indexOf(
        e.target.parentNode.querySelector("p").innerHTML
      );
      filterArr.splice(index, 1);
      selected.innerHTML = "";
      alterTable();
      if (filterArr.length == 0) {
        skillShow("");
        clearFilterHandler();
      } else {
        filterArr.forEach((data) => {
          skillShow(data);
        });
      }
    }
  }
};

function resetSortIconToDefault() {
  const headers = document.querySelectorAll("th");
  headers.forEach((header) => {
    if (header.firstElementChild.dataset.column)
      header.firstElementChild.children[0].classList.add("close");
  });
  headers[0].children[0].children[0].setAttribute(
    "src",
    "assets/images/sort-initial-icon.svg"
  );
  headers[0].children[0].children[0].classList.remove("close");
}

function clearFilterHandler() {
  filterArr = [];
  alterTable();
  selected.innerHTML = "";
  skillShow("");
  resetSortIconToDefault();
  renderTable(actualData);
}

searchFilter.onclick = () => {
  if ((searchFilter.innerHTML = "filter_alt_off")) {
    clearFilterHandler();
  }
};

filterShow.addEventListener("input", (e) => {
  if (e.target.value === "") dataSkills = [];
  dataSkills = [...skillsArr];
  dataSkills = dataSkills.filter((indSkill) =>
    indSkill.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderSkills(dataSkills);
});

export function alterTable() {
  // console.log("alter table iscalled");
  // console.log("alterTable", userArr);
  filterArray = [...actualData];
  let searchValue = search.value;
  if(searchValue) {
    filterArray = filterArray.filter((name) =>
    name.fName.toLowerCase().includes(searchValue.toLowerCase())
  );
  }
  if(filterArr.length !== 0) {
    filterArray = filterArray.filter((user) =>
    filterArr.every((skill) => user.skill.includes(skill))
  );
  }
  resetSortIconToDefault();
  renderTable(filterArray);
}