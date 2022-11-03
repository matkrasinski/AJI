"use strict"
let todoList = []; //declares a new array for Your todo list
const MASTER_KEY = '$2b$10$FxWaSLC9x2/A2qDK3nrrS.cSLoStAjfgOYnqGUzBW0XuUnErp.DmC';
const BIN_URL = 'https://api.jsonbin.io/v3/b/63486a2f65b57a31e69552bc';

let initList = function() {
  $.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: BIN_URL,
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
      'X-MASTER-KEY': MASTER_KEY
    },
    success: (data) => {
      todoList = data.record;
      $(document).ready(updateTodoList());
    },
    error: (err) => {
      console.error(err.responseJSON);
    }
   });
}
$(document).ready(initList());

let updateJSONbin = function() {
  $.ajax({
    url: BIN_URL,
    type: 'PUT',
    headers: { //Required only if you are trying to access a private bin
      'X-MASTER-KEY': MASTER_KEY
    },
    contentType: 'application/json',
    data: JSON.stringify(todoList),
    error: (err) => {
      console.error(err.responseJSON);
    }
  });
}

let deleteTodo = function(index) {
  if (todoList.length != 1) {
    todoList.splice(index,1);
  } else {
    addTodo();
    todoList.splice(index,1);
  }
  updateJSONbin();
}

let addTodo = function() {
  //get the elements in the form
    let inputTitle = $('#inputTitle');
    let inputDescription = $('#inputDescription');
    let inputPlace = $('#inputPlace');
    let inputDate = $('#inputDate');
  //get the values from the form
    let newTitle = inputTitle.val();
    let newDescription = inputDescription.val();
    let newPlace = inputPlace.val();
    let newDate = new Date(inputDate.val());
  //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };
    //add item to the list
    if (newTodo.title != "" && newTodo.description != "" &&
        newTodo.place != "" && convertToNumber(newTodo.dueDate) != 19700101) {
          todoList.push(newTodo);
          updateJSONbin();
        }
}

let updateTodoList = function() {
  let todoListDiv = $("#todoListView");
  todoListDiv.empty();

  $("<tr><th>Title</th><th>Description</th><th>Due Date</th></tr>").appendTo(todoListDiv);

  let filterInput = $("#inputSearch");
  var endDate = convertToNumber(new Date($('#endDate').val()));
  var startDate = convertToNumber(new Date($('#startDate').val()));

  for (let todo in todoList) {
    let thisDate = convertToNumber(new Date(todoList[todo].dueDate));
    if (
      ((filterInput.val() == "") ||
      (todoList[todo].title.toLowerCase().includes(filterInput.val().toLowerCase())) ||
      (todoList[todo].description.toLowerCase().includes(filterInput.val().toLowerCase()))) &&
      (todoList[todo].title != "" && todoList[todo].description != "") && 
      ((thisDate >= startDate && thisDate <= endDate) || !endDate || !startDate ||
      thisDate == 19700101)         // null value is converted to this date 1970/01/01 
    ) {
      // declaring new row
        let newRow = $("<tr></tr>");
      // new title data
        $("<td></td>",{             
          text : todoList[todo].title,    
          class : "data1",
          height : "40px"
        }).appendTo(newRow);          
      // new description data
        $("<td></td>",{
          text : todoList[todo].description,  
          class : 'data2'
        }).appendTo(newRow);
      // date
        $("<td></td>", {
          text : dateToDisplay(new Date(todoList[todo].dueDate)),
          class : 'data3'
        }).appendTo(newRow);
      //button
        $("<input></input>", {
            type : "button",
            value : "Delete",
            id : "delete_btn",
            class : "btn btn-outline-primary btn-sm btn-rounded"
          }).click(function() {
            deleteTodo(todo);
            updateTodoList();
        }).appendTo(newRow);
      todoListDiv.append(newRow);
      }
    }
}

let convertToNumber = function(date) {
  var currentDayOfMonth = date.getDate();
  var currentMonth = date.getMonth() + 1;
  var currentYear = date.getFullYear();
  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  } 
  if (currentDayOfMonth < 10) {
    currentDayOfMonth = "0" + currentDayOfMonth;
  }
  return parseInt(currentYear + "" + currentMonth + "" + currentDayOfMonth);
}

let dateToDisplay = function(date) {
  var currentDayOfMonth = date.getDate();
  var currentMonth = date.getMonth() + 1;
  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  } 
  if (currentDayOfMonth < 10) {
    currentDayOfMonth = "0" + currentDayOfMonth;
  }
  return currentDayOfMonth + '/' + currentMonth + '/' +  date.getFullYear();
}