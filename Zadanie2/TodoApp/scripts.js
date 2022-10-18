"use strict"
let todoList = []; //declares a new array for Your todo list
//
// let initList = function() {
//     let savedList = window.localStorage.getItem("todos");
//     if (savedList != null)
//         todoList = JSON.parse(savedList);
//     else
//     //code creating a default list with 2 items
//   todoList.push(
//   {
//       title: "Learn JS",
//       description: "Create a demo application for my TODO's",
//       place: "445",
//       dueDate: new Date(2019,10,16)
//   },
//   {
//       title: "Lecture test",
//       description: "Quick test from the first three lectures",
//       place: "F6",
//       dueDate: new Date(2019,10,17)
//   }
//       // of course the lecture test mentioned above will not take place
//   );
// }
// $.ajax({
//     // copy Your bin identifier here. It can be obtained in the dashboard
//     url: 'https://api.jsonbin.io/b/6348595965b57a31e6954369',
//     type: 'GET',
//     headers: { //Required only if you are trying to access a private bin
//       'Access-Control-Allow-Origin' : '*',
//       'Access-Control-Allow-Credentials' : 'true',
//       'Access-Control-Allow-Methods:' : 'GET',
//       'Access-Control-Allow- Headers' : 'Origin',  
//       'secret-key':'$2b$10$FxWaSLC9x2/A2qDK3nrrS.cSLoStAjfgOYnqGUzBW0XuUnErp.DmC'
//     },
//       success: (data) => {
//       console.log(data);
//       todoList = data;
//     },
//     error: (err) => {
//       console.log(err.responseJSON);
//     }
// });

let req = new XMLHttpRequest();
req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    todoList = req.response.record;
  }
};
req.open("GET", "https://api.jsonbin.io/v3/b/63486a2f65b57a31e69552bc/latest", true);
req.responseType = 'json';
req.setRequestHeader("X-Master-Key", "$2b$10$FxWaSLC9x2/A2qDK3nrrS.cSLoStAjfgOYnqGUzBW0XuUnErp.DmC");
req.send();

let updateJSONbin = function() {
  // let req = new XMLHttpRequest();
  var json = JSON.stringify(todoList);
  
  req.open("PUT", "https://api.jsonbin.io/v3/b/63486a2f65b57a31e69552bc", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$FxWaSLC9x2/A2qDK3nrrS.cSLoStAjfgOYnqGUzBW0XuUnErp.DmC");
  req.onload = function() {
    var list = req.response;
    if (req.readyState == 4 && req.status == '200') {
      console.log(list.record);
    } else {
      console.error(list);
    }
  }
  req.send(json);
}

let deleteTodo = function(index) {
  todoList.splice(index,1);
  updateJSONbin();
}
// initList();


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

let updateTodoList = function() {
  let todoListDiv =
  document.getElementById("todoListView");

  //remove all elements
  while (todoListDiv.firstChild) {
      todoListDiv.removeChild(todoListDiv.firstChild);
  }

 //add all elements
let filterInput = document.getElementById("inputSearch");
for (let todo in todoList) {
  if (
    (filterInput.value == "") ||
    (todoList[todo].title.includes(filterInput.value)) ||
    (todoList[todo].description.includes(filterInput.value))
  ) {
    let newElement = document.createElement("tr");
    newElement.style.width = '100px';
    let newTD = document.createElement("td"); 

    newTD.append(todoList[todo].title);
    newElement.appendChild(newTD);
    
    newTD = document.createElement("td");
    
    newTD.append(todoList[todo].description);
    newElement.appendChild(newTD);

    //delete button
    let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";
        newDeleteButton.addEventListener("click",
            function() {
                deleteTodo(todo);
            });
    
    // newElement.appendChild(newContent);
    todoListDiv.appendChild(newElement);
    newElement.appendChild(newDeleteButton);
    }
  }
}
setInterval(updateTodoList, 1000);