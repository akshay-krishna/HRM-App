import { alterTable, searchFilter, selected } from "./list.js"; //filterArr

export function renderTable(dataArr) {
  document.querySelector("tbody").innerHTML = "";
  const tableBody = document.querySelector("tbody");
  tableBody.querySelectorAll("tr").forEach((row) => row.remove());
  dataArr.forEach((data) => {
    let temp = "";
    temp = `<tr data-employee-id=${data.id}>
      <td data-column="id">${data.id}</td>
      <td data-column="fname">${data.fName}</td>
      <td data-column="lname">${data.lName}</td>
      <td data-column="role">${data.role}</td>
      <td data-column="dept">${data.department}</td>
      <td>
        <div  class="flex-row action-icons">
          <img data-employee-id=${data.id}
            class="edit-delete-btn edit-btn"
            src="assets/images/edit-icon.svg"
            alt="action-icons"
          />
          <img data-employee-id=${data.id}
            class="edit-delete-btn delete-btn"
            src="assets/images/delete-icon.svg"
            alt="action-icons"
          />
        </div>
      </td>
    </tr>`;
    document.querySelector("tbody").innerHTML += temp;
  });
}

export function renderSkills(dataArr) {
  document.querySelector(".skill-list").innerHTML = "";
  document.querySelector(".add-skill-list").innerHTML = "";
  dataArr.forEach((data) => {
    let temp = "";
    temp = `<li>${data.name}</li>`;
    document.querySelector(".skill-list").innerHTML += temp;
    document.querySelector(".add-skill-list").innerHTML += temp;
  });
}

export function renderRole(dataArr) {
  document.querySelector(".add-role-list").innerHTML = "";
  dataArr.forEach((data) => {
    let temp = "";
    temp = `<li>${data.name}</li>`;
    document.querySelector(".add-role-list").innerHTML += temp;
  });
}

export function renderDept(dataArr) {
  document.querySelector(".add-department-list").innerHTML = "";
  dataArr.forEach((data) => {
    let temp = "";
    temp = `<li>${data.name}</li>`;
    document.querySelector(".add-department-list").innerHTML += temp;
  });
}

export function renderLocation(dataArr) {
  document.querySelector(".add-location-list").innerHTML = "";
  dataArr.forEach((data) => {
    let temp = "";
    temp = `<li>${data.name}</li>`;
    document.querySelector(".add-location-list").innerHTML += temp;
  });
}

export function skillShow(dataName) {
  if (dataName == "") {
    searchFilter.innerHTML = "filter_alt";
    return;
  } else {
    searchFilter.innerHTML = "filter_alt_off";
  }
  selected.classList.remove("close");
  selected.innerHTML += `<span class="individual-skills flex-row"><p>${dataName}</p><span class="material-symbols-outlined cancel">
      cancel
      </span></span>`;
  alterTable();
}
