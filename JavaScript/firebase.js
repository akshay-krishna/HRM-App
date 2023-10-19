import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  set,
  onValue,
  update,
  remove,
  ref,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as strRef,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

import { filterArr } from "./list.js";

export let userArr = [];

const firebaseConfig = {
  apiKey: "AIzaSyCcFtmysQuXGxB37CURuD9iYx1J_l9Bnjs",
  authDomain: "hr-management-app-8caae.firebaseapp.com",
  databaseURL:
    "https://hr-management-app-8caae-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hr-management-app-8caae",
  storageBucket: "hr-management-app-8caae.appspot.com",
  messagingSenderId: "157752077809",
  appId: "1:157752077809:web:e504341bfa878ea0a4e850",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export let individualdata;

export function getUser(callback) {
  let userRef = ref(db, "employee/");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      userArr = [];
      const data = snapshot.val();
      for (const key in data) {
        const obj = {
          id: key,
          ...data[key],
        };
        if (filterArr) {
          // console.log(obj.skill.includes("JS"));
          userArr.push(obj);
        } else {
          filterArr.forEach((element) => {
            // console.log(element);
            if (obj.skill.includes(element)) {
              userArr.push(obj);
            }
          });
        }
      }
      // console.log(userArr);
      callback(userArr);
    } else {
      callback([]);
    }
  });
}

export function getSkills(callback) {
  const userRef = ref(db, "skill/");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      const dataArr = [];
      const data = snapshot.val();
      for (const key in data) {
        const obj = {
          id: key,
          ...data[key],
        };
        dataArr.push(obj);
      }
      callback(dataArr);
      // console.log(dataArr);
    } else {
      callback([]);
    }
  });
}

export function getRole(callback) {
  const userRef = ref(db, "role/");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      const dataArr = [];
      const data = snapshot.val();
      for (const key in data) {
        const obj = {
          id: key,
          name: data[key],
        };
        dataArr.push(obj);
      }
      callback(dataArr);
    } else {
      callback([]);
    }
  });
}

export function getDept(callback) {
  const userRef = ref(db, "department/");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      const dataArr = [];
      const data = snapshot.val();
      for (const key in data) {
        const obj = {
          id: key,
          name: data[key],
        };
        dataArr.push(obj);
      }
      callback(dataArr);
    } else {
      callback([]);
    }
  });
}

export function getLocation(callback) {
  const userRef = ref(db, "workingLocation/");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      const dataArr = [];
      const data = snapshot.val();
      for (const key in data) {
        const obj = {
          id: key,
          name: data[key],
        };
        dataArr.push(obj);
      }
      callback(dataArr);
    } else {
      callback([]);
    }
  });
}

export function createUser(data, userID) {
  set(ref(db, "employee/" + userID), data);
}

export function updateUser(data, userID) {
  update(ref(db, "employee/" + userID), data);
}

export function deleteUser(userID) {
  remove(ref(db, "employee/" + userID), null);
}

export function getIndvData(id) {
  let indvRef = ref(db, "employee/" + id);
  onValue(indvRef, (snapshot) => {
    individualdata = snapshot.val();
    if (individualdata) {
      // console.log("data inside getindvdata ", individualdata);
    } else {
      // console.log("No data found");
    }
  });
}
