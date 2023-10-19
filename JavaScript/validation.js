export const fname = document.getElementById("fname");
const fnameError = document.getElementById("fname-error");
export const lname = document.getElementById("lname");
const lnameError = document.getElementById("lname-error");
export const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
// const submit = document.getElementById("submit");
const addForm = document.querySelector(".add-edit-employee-form");
// const addEditEmployeeModal = document.querySelector(".add-edit-employee-modal");
// const overlay = document.querySelector(".overlay");
// const close = document.querySelector(".close-add-edit-icon");
export const role = document.getElementById("role");
export const department = document.getElementById("department");
const location = document.getElementById("location");
export const dob = document.getElementById("dob");
export const phoneNumber = document.getElementById("phone-number");
const phoneErr = document.getElementById("phone-error");
export const address = document.getElementById("address");
const err = document.querySelectorAll(".err");
// const skillAddSearch = document.getElementById("skill-add-search");
// const handleClose = document.querySelector(".close-add-edit-icon");

function firstNameValidator() {
  let text = "";
  const validFirstName = /^[A-Za-z]+$/;
  if (fname.value == "") {
    text = "The field cant be blank";
  } else if (!validFirstName.test(fname.value)) {
    text = "First name must only contain alphabets";
  } else {
    text = "";
    fnameError.innerHTML = "Error placeholder";
    fnameError.classList.remove("visible");
    return true;
  }
  fnameError.innerHTML = text;
  fnameError.classList.add("visible");
}

function lastNameValidator() {
  let text = "";
  const validLastName = /^[A-Za-z]+$/;
  if (lname.value == "") {
    text = "The field cant be blank";
  } else if (!validLastName.test(lname.value)) {
    text = "Last name must only contain alphabets";
  } else {
    text = "";
    lnameError.innerHTML = "Error placeholder";
    lnameError.classList.remove("visible");
    return true;
  }
  lnameError.innerHTML = text;
  lnameError.classList.add("visible");
}

function emailValidator() {
  console.log("email validator");
  let text = "";
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value == "") {
    console.log("inside blank check");
    text = "The field cant be blank";
  } else if (!validEmail.test(email.value)) {
    console.log("inside format check");
    text = "Email should be in the correct format";
  } else {
    console.log("inside else ie correct email");
    text = "";
    emailError.innerHTML = "Error placeholder";
    emailError.classList.remove("visible");
    return true;
  }
  emailError.innerHTML = text;
  emailError.classList.add("visible");
}

function phoneValidator() {
  let text = "";
  const validPhnNo = /^[0-9]{10}$/;
  if (phoneNumber.value == "") {
    text = "The field cant be blank";
  } else if (!validPhnNo.test(phoneNumber.value)) {
    text = "Phone number should have 10-digits";
  } else {
    text = "";
    phoneErr.innerHTML = "Error placeholder";
    phoneErr.classList.remove("visible");
    return true;
  }
  phoneErr.innerHTML = text;
  phoneErr.classList.add("visible");
}

function blankValidator(inputField) {
  const errorTag = inputField.parentElement.querySelector(".err");
  if (inputField.value == "") {
    errorTag.innerHTML = "The field cant be blank";
    errorTag.classList.add("visible");
    return false;
  }
  return true;
}

export function submitValidator() {
  // err.forEach((errors) => {
  //   errors.innerHTML = "Error hoho";
  //   errors.classList.remove("visible");
  // });
  if (
    firstNameValidator() &&
    lastNameValidator() &&
    emailValidator() &&
    blankValidator(role) &&
    blankValidator(department) &&
    blankValidator(location) &&
    blankValidator(dob) &&
    blankValidator(address)
  ) {
    return true;
  } else {
    return false;
  }
}

fname.onchange = function () {
  fnameError.innerHTML = "";
  firstNameValidator();
};

lname.onchange = function () {
  lnameError.innerHTML = "";
  lastNameValidator();
};

email.onchange = function () {
  emailError.innerHTML = "";
  emailValidator();
};

phoneNumber.onchange = function () {
  phoneErr.innerHTML = "";
  phoneValidator();
};

dob.onfocus = () => {
  let currentDate = new Date();
  addForm["dob"].max = `${currentDate.getFullYear() - 10}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
};

// close.onclick = () => {
//   console.log("Before foreach");
//   err.forEach((errors) => {
//     console.log("hohoh");
//     errors.innerHTML = "Error hoho";
//     errors.classList.remove("visible");
//   });
// };
