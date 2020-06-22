//SELECTORS
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-todos");

//VARIABLES
let pendingListArray = [];
let completedListArray = [];

//EVENT LISTENERS
document.getElementById("todo-button").addEventListener("click", updateList);
todoList.addEventListener("click", deleteCheck);
completedList.addEventListener("click", undoCheck);

//FUNCTIONS
function updateList(e) {
  //Prevent form from submitting
  e.preventDefault();
  //Populate the array with input
  pendingListArray.push(autoCapital(todoInput.value));
  console.log("Pending List: ", pendingListArray);
  //Create a Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todoDiv");
  //Create, populate and append li to TodoDiv
  let todoItem = document.createElement("li");
  todoItem.innerText = autoCapital(todoInput.value);
  todoItem.classList.add("todo-item");
  todoDiv.appendChild(todoItem);
  //Clear todo input value
  todoInput.value = "";
  //Add checkbox button
  let checkbox = document.createElement("button");
  checkbox.innerHTML = '<i class="fas fa-check"></i>';
  checkbox.classList.add("checkbox");
  todoDiv.appendChild(checkbox);
  //Add Trash button
  let trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trashButton");
  todoDiv.appendChild(trashButton);
  //Attach the todoDiv to Ul
  todoList.appendChild(todoDiv);
}

function autoCapital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trashButton") {
    //Remove item from the array
    const itemToRemove = item.parentElement.firstChild.innerText;
    for (let i = 0; i < pendingListArray.length; i++) {
      if (pendingListArray[i] === itemToRemove) {
        pendingListArray.splice(i, 1);
        console.log(pendingListArray);
      }
    }
    //Animation
    item.parentElement.classList.add("fall");
    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }

  if (item.classList[0] === "checkbox") {
    const completedItem = item.parentElement.firstChild.innerText;
    //Add the item to completed list array
    completedListArray.push(completedItem);
    //Remove the item from pending list array
    for (let i = 0; i < pendingListArray.length; i++) {
      if (pendingListArray[i] === completedItem) {
        pendingListArray.splice(i, 1);
      }
    }
    console.log("Completed List: ", completedListArray);
    item.parentElement.classList.toggle("completed");
    //Create a div of completed item
    const completeTodo = document.createElement("div");
    completeTodo.classList.add("completedtodoDiv");
    //Create, populate and append li to CompletetodoDiv
    let completetodoItem = document.createElement("li");
    completetodoItem.innerText = completedItem;
    completeTodo.appendChild(completetodoItem);
    //Add checkbox button
    let checkbox = document.createElement("button");
    checkbox.innerHTML = '<i class="fas fa-check"></i>';
    checkbox.classList.add("checkbox");
    completeTodo.appendChild(checkbox);
    completedList.appendChild(completeTodo);
    //Remove the item from pending items
    item.parentElement.remove();
  }
}

function undoCheck() {}
