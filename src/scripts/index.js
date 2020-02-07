import "@fortawesome/fontawesome-free/js/all";
import "bootstrap";
//css
import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// 0 Doc downloaded, get lists
// 1 Add eventlistener
// 2 Find input Field
// 3 Get value
// 4 Create new li (checkbox+text+icon)

//Создаем переменные
let importantAndUrgent,
  importantAndNotUrgent,
  notImportantAndUrgent,
  notImportantNotUrgent;

(function() {
  // нашли 4 квадранта
  importantAndUrgent = document.getElementById("importantAndUrgent");
  importantAndNotUrgent = document.getElementById("importantAndNotUrgent");
  notImportantAndUrgent = document.getElementById("notImportantAndUrgent");
  notImportantNotUrgent = document.getElementById("notImportantNotUrgent");

  // квадранты в массив
  let quadrants = [
    importantAndUrgent,
    importantAndNotUrgent,
    notImportantAndUrgent,
    notImportantNotUrgent
  ];

  // пербираем массив и ищем кнопку
  quadrants.forEach(quadrant => {
    const button = quadrant.getElementsByTagName("button")[0];

    button.addEventListener("click", () => {
      addNewTask(quadrant);
    });
    const todoList = quadrant.getElementsByClassName("todoList")[0];

    const doneList = quadrant.getElementsByClassName("doneList")[0];

    const checkboxesTodo = todoList.querySelectorAll("[type='checkbox']");

    const checkboxesDone = doneList.querySelectorAll("[type='checkbox']");

    const iconsTodo = todoList.querySelectorAll(".fas-icon");

    const iconsDone = doneList.querySelectorAll(".fas-icon");

    //перебираем массив checkboxes
    checkboxesTodo.forEach(checkbox => {
      checkbox.addEventListener("click", () => {
        markAsDone(checkbox, quadrant);
      });
    });

    checkboxesDone.forEach(checkbox => {
      checkbox.addEventListener("click", () => {
        markAsNotDone(checkbox, quadrant);
      });
    });

    //перебираем иконки
    iconsTodo.forEach(icon => {
      icon.addEventListener("click", () => {
        deleteItemTodo(icon, quadrant);
      });
    });

    iconsDone.forEach(icon => {
      icon.addEventListener("click", () => {
        deleteItemDone(icon, quadrant);
      });
    });
  });
})();
// from todo to done
function markAsDone(checkbox, quadrant) {
  const doneListQuadrant = quadrant.getElementsByClassName("doneList")[0];
  doneListQuadrant.appendChild(checkbox.parentElement, quadrant);
  checkbox.addEventListener("click", () => {
    markAsNotDone(checkbox, quadrant);
  });
}

// from done to todo
function markAsNotDone(checkbox, quadrant) {
  const todoListQuadrant = quadrant.getElementsByClassName("todoList")[0];
  todoListQuadrant.appendChild(checkbox.parentElement, quadrant);
  checkbox.addEventListener("click", () => {
    markAsDone(checkbox, quadrant);
  });
}

function deleteItemTodo(icon, quadrant) {
  const todoListQuadrant = quadrant.getElementsByClassName("todoList")[0];
  todoListQuadrant.removeChild(icon.parentElement, quadrant);
}

function deleteItemDone(icon, quadrant) {
  const doneListQuadrant = quadrant.getElementsByClassName("doneList")[0];
  doneListQuadrant.removeChild(icon.parentElement, quadrant);
}

// Добавляет новый таск
function addNewTask(quadrant) {
  getInputValue(quadrant);
  const value = getInputValue(quadrant); // пришло из input getInputValue

  if (value) {
    addNewItem(value, quadrant); // если input есть - непустой то добавляем новый элемент
  } else {
    alert("Plese add value to input");
  }
}

//Возвращает значение поля input
function getInputValue(quadrant) {
  return quadrant.getElementsByClassName("new-task-input")[0].value;
}

// будем добавлять новый li к списку todo
function addNewItem(value, quadrant) {
  const list = quadrant.getElementsByClassName("todoList")[0]; // Нашли список todo
  const newLi = getWithText(value); // в переменную li c текстом с function getWithText(value)
  list.appendChild(newLi); // крепим li c текстом к списку todo
  let checkboxesTodo = list.querySelectorAll("[type='checkbox']");
  checkboxesTodo.forEach(checkbox => {
    checkbox.addEventListener("click", () => {
      markAsDone(checkbox, quadrant);
    });
  });

  return list;
}
// вернет правильный новый элемент li, мы создаем новый li
function getWithText(value) {
  const newListItem = document.createElement("li"); // node element, есть пустрой тег li из input
  const checkbox = getCheckBox(); // пришел новый checkbox из getCheckBox функии ниже
  const text = document.createTextNode(" " + value); // создаем текст из input для li
  const icon = getDeleteIcon(); // get созданную иконку в функии ниже getDeleteIcon
  const space = document.createTextNode(" ");
  const spanIcon = document.createElement("SPAN");
  spanIcon.appendChild(icon);
  newListItem.appendChild(checkbox); // добавляем новый чекбокс
  newListItem.appendChild(text); // прикрепляем к нашему li наш текст
  newListItem.appendChild(space); // добавляем пробел перед иконкой
  newListItem.appendChild(spanIcon); // прикрепляем иконку

  spanIcon.addEventListener("click", () => {
    spanIcon.parentElement.classList.add("remove");
  });
  return newListItem;
}

// Возвращает новый элемент checkbox, создаем
function getCheckBox() {
  const input = document.createElement("input");
  input.type = "checkbox";
  return input;
}

// Делаем иконку, создаем с определенным классом
function getDeleteIcon() {
  const i = document.createElement("i");
  i.className = "fas fa-trash";
  return i;
}
