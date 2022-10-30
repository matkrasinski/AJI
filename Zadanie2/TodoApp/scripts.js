"use strict"
let todoList = []; //declares a new array for Your todo list

let initList = function() {
  $.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: 'https://api.jsonbin.io/v3/b/63486a2f65b57a31e69552bc',
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
      'X-MASTER-KEY': '$2b$10$FxWaSLC9x2/A2qDK3nrrS.cSLoStAjfgOYnqGUzBW0XuUnErp.DmC',
    },
    success: (data) => {
      todoList = data.record;
    },
    error: (err) => {
      console.log(err.responseJSON);
    }
   });
}
initList();

let updateJSONbin = function() {
  $.ajax({
    url: 'https://api.jsonbin.io/v3/b/63486a2f65b57a31e69552bc',
    type: 'PUT',
    headers: { //Required only if you are trying to access a private bin
      'X-MASTER-KEY': '$2b$10$FxWaSLC9x2/A2qDK3nrrS.cSLoStAjfgOYnqGUzBW0XuUnErp.DmC',
    },
    contentType: 'application/json',
    data: JSON.stringify(todoList),
    success: (data) => {
      console.log(data);
    },
    error: (err) => {
      console.log(err.responseJSON);
    }
  });
}

let deleteTodo = function(index) {
  todoList.splice(index,1);
  updateJSONbin();
}

let addTodo = function() {
  //get the elements in the form
    let inputTitle = document.getElementById("inputTitle");
    let inputDescription = document.getElementById("inputDescription");
    let inputPlace = document.getElementById("inputPlace");
    let inputDate = document.getElementById("inputDate");
  //get the values from the form
    let newTitle = inputTitle.value;
    let newDescription = inputDescription.value;
    let newPlace = inputPlace.value;
    let newDate = new Date(inputDate.value);
  //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };
  //add item to the list
    todoList.push(newTodo);
    window.localStorage.setItem("todos", JSON.stringify(todoList));
    updateJSONbin();
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

let updateTodoList = function() {
  let todoListDiv =
  document.getElementById("todoListView");

  //remove all elements
  while (todoListDiv.firstChild) {
      todoListDiv.removeChild(todoListDiv.firstChild);
  }

  let newRow = document.createElement("tr");
  let newData = document.createElement("td");
  newData.append("Title");
  newRow.appendChild(newData);
  newData.className = "title"; 
  newData = document.createElement("td");
  newData.append("Description");
  newRow.appendChild(newData);
  newData.className = "desc";
  todoListDiv.appendChild(newRow);
  

let filterInput = document.getElementById("inputSearch");
var endDate = convertToNumber(new Date(document.getElementById("endDate").value));
var startDate = convertToNumber(new Date(document.getElementById("startDate").value));

for (let todo in todoList) {
  let thisDate = convertToNumber(new Date(todoList[todo].dueDate));
  if (
    ((filterInput.value == "") ||
    (todoList[todo].title.includes(filterInput.value)) ||
    (todoList[todo].description.includes(filterInput.value))) &&
    ((thisDate >= startDate && thisDate <= endDate) || !endDate || !startDate)
  ) {
    let newElement = document.createElement("tr");
    let newTD = document.createElement("td"); 
    newTD.className = 'task1';
    newTD.append(todoList[todo].title);
    newElement.appendChild(newTD);
    
    newTD = document.createElement("td");
    newTD.className = 'task2';
    newTD.append(todoList[todo].description);
    newElement.appendChild(newTD);

    //delete button
    let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";
        newDeleteButton.id = "delete_btn";
        // newDeleteButton.className = 'task';
        newDeleteButton.addEventListener("click",
            function() {
                deleteTodo(todo);
            });
    
    // newElement.appendChild(newContent);
    newElement.appendChild(newDeleteButton);
    todoListDiv.appendChild(newElement);
    }
  }
}
setInterval(updateTodoList, 1000);

