import { renderTable } from "./UI.js";
import { actualData } from "./index.js";
import { arrow } from "./index.js";
import { filterArray } from "./list.js";//filterArr
let prevColumn = "";
let flag = 1;
const headers = document.querySelectorAll("th");

export function sortColumn(columnType) {
  document.querySelector(".arrow").src = "assets/images/ascending-arrow.svg";

  if (prevColumn !== columnType) flag = 1;
  prevColumn = columnType;
  let arrayToSort = [];
  if (filterArray.length == 0) {
    arrayToSort = [...actualData];
  } else {
    arrayToSort = [...filterArray];
  }
  arrayToSort.sort((a, b) => {
    // console.log(a, " ghegdghf ", b);
    if (a[columnType].toLowerCase() < b[columnType].toLowerCase()) {
      return -1 * flag;
    } else if (a[columnType].toLowerCase() > b[columnType].toLowerCase()) {
      return 1 * flag;
    } else return 0;
  });
  headers.forEach((header) => {
    if (header.firstElementChild.dataset.column)
      header.firstElementChild.children[0].classList.add("close");
    if (header.firstElementChild.dataset.column == columnType) {
      header.firstElementChild.children[0].classList.remove("close");
      if (flag == 1) {
        arrow.style.transform = "rotateX(0deg)";
      } else arrow.style.transform = "rotateX(180deg)";
    }
  });
  flag = flag * -1;
  // console.table(arrayToSort, "sorted");
  // console.table(actualData, "actual data");
  renderTable(arrayToSort);
}
