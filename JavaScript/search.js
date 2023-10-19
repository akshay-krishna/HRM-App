import { actualData, search } from "./index.js";
import { renderTable } from "./UI.js";

let nameArr = [];

export function searchElement() {
  let searchValue = search.value;
  nameArr = actualData.filter((name) =>
    name.fName.toLowerCase().includes(searchValue.toLowerCase())
  );
  renderTable(nameArr);
}
