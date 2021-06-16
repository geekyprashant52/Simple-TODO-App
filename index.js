console.log("Script Loaded");

var taskText = document.getElementById("task-text");
var addBtn = document.getElementById("addBtn");
var taskItems = document.getElementById("task-wrapper");
var deleteIcon = document.getElementsByClassName("fa-trash");
var monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var task = "";
var id = 0;
let taskArr = [];

let getDate = () => {
  var date = new Date();
  let resultDate =
    date.getDate() +
    "-" +
    monthArr[date.getMonth()] +
    "-" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();
  return resultDate;
};

let addDate = (dateText, date) => {
  dateText.innerHTML = date;
};

let addDataToStorage = (obj) => {
  localStorage.setItem("taskArr", JSON.stringify(obj));
  //console.log(JSON.parse(localStorage.getItem("taskArr")));
};

let createnewTaskText = (taskFn, dateFn) => {
  if ((taskFn + "").trim().length === 0) {
    alert("Nothing to add!");
  } else {
    var newDiv = document.createElement("div");
    newDiv.className = "task-items";
    var heading = document.createElement("h1");
    heading.innerHTML = taskFn;
    newDiv.appendChild(heading);
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    deleteIcon.id = id;
    newDiv.id = "task" + id;
    newDiv.appendChild(deleteIcon);
    deleteIcon.onclick = function () {
      newDiv.parentNode.removeChild(newDiv);
    };
    var dateText = document.createElement("p");
    dateText.className = "date-time-text";
    addDate(dateText, dateFn);
    newDiv.appendChild(dateText);
    taskItems.appendChild(newDiv);
    id++;
    taskText.value = "";
    let obj = {
      task: heading.innerHTML,
      date: dateText.innerHTML,
    };
    taskArr.push(obj);
    addDataToStorage(taskArr);
    //console.log(taskItems);
  }
};

let showDataOnly = (task, date) => {
  if ((task + "").trim().length === 0) {
    alert("Nothing to add!");
  } else {
    var newDiv = document.createElement("div");
    newDiv.className = "task-items";
    var heading = document.createElement("h1");
    heading.innerHTML = task;
    newDiv.appendChild(heading);
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    deleteIcon.id = id;
    newDiv.id = "task" + id;
    newDiv.appendChild(deleteIcon);
    deleteIcon.onclick = function () {
      newDiv.parentNode.removeChild(newDiv);
      console.log("Node deleted: " + deleteIcon.id);
    };
    var dateText = document.createElement("p");
    dateText.className = "date-time-text";
    addDate(dateText, date);
    newDiv.appendChild(dateText);
    taskItems.appendChild(newDiv);
    id++;
    taskText.value = "";
    // let obj = {
    //   task: heading.innerHTML,
    //   date: dateText.innerHTML,
    // };
    // taskArr.push(obj);
    // addDataToStorage(taskArr);
  }
};

let checkDataFromStorage = () => {
  let storedData = JSON.parse(localStorage.getItem("taskArr"));
  if (storedData != null) {
    if (storedData.length > 0) {
      taskArr = [];
      taskArr = storedData;
      // taskArr.map((item) => {
      //   console.log(item.task, item.date);
      //   createnewTaskText(item.task, item.date);
      // });
      taskArr.map((item) => {
        if (storedData.indexOf(item) == -1) {
          //console.log("No Duplicates found");
        } else {
          //console.log("Duplicate data found");
          showDataOnly(item.task, item.date);
        }
      });
    } else {
      //console.log("Data Not Found in Database");
    }
  } else {
    localStorage.setItem("taskArr", JSON.stringify(taskArr));
  }
};

checkDataFromStorage();

taskText.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    createnewTaskText(taskText.value, getDate());
  }
});

addBtn.addEventListener("click", function () {
  createnewTaskText(taskText.value, getDate());
});
