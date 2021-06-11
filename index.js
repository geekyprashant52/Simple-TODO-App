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

taskText.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    createnewTaskText();
  }
});

var createnewTaskText = () => {
  if ((taskText.value + "").trim().length === 0) {
    alert("Nothing to add!");
  } else {
    var newDiv = document.createElement("div");
    newDiv.className = "task-items";
    var heading = document.createElement("h1");
    heading.innerHTML = taskText.value;
    newDiv.appendChild(heading);
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    newDiv.id = "task" + id;
    newDiv.appendChild(deleteIcon);
    deleteIcon.onclick = function () {
      newDiv.parentNode.removeChild(newDiv);
    };
    var dateText = document.createElement("p");
    dateText.className = "date-time-text";
    addDate(dateText);
    newDiv.appendChild(dateText);
    taskItems.appendChild(newDiv);
    id++;
    taskText.value = "";
  }
};

addBtn.addEventListener("click", function () {
  createnewTaskText();
});

var addDate = (dateText) => {
  var date = new Date();
  dateText.innerHTML =
    date.getDate() +
    "-" +
    monthArr[date.getMonth()] +
    "-" +
    date.getFullYear() +
    "           " +
    date.getHours() +
    ":" +
    date.getMinutes();
};
