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
          userArr.push(obj);
        } else {
          filterArr.forEach((element) => {
            if (obj.skill.includes(element)) {
              userArr.push(obj);
            }
          });
        }
      }
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
  return;
}

export function updateUser(data, userID) {
  update(ref(db, "employee/" + userID), data);
}

export function deleteUser(userID) {
  remove(ref(db, "employee/" + userID), null);
}

export async function getIndvData(id) {
  let indvRef = ref(db, "employee/" + id);
  onValue(indvRef, (snapshot) => {
    individualdata = snapshot.val();
  });
}

export const uploadImage = (file) => {
  try {
    if (!file) {
      return Promise.resolve(
        "https://firebasestorage.googleapis.com/v0/b/hr-management-app-8caae.appspot.com/o/avatar.svg?alt=media&token=0639e6c3-720b-4c13-bd81-2dd70b4b5f56"
      );
    }
    const storage = getStorage();
    const storageRef = strRef(storage, crypto.randomUUID());
    return uploadBytes(storageRef, file).then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    });
  } catch (err) {
    console.log(err);
  }
};
