// получаем колонку ToDo по id
const todo = document.getElementById("todo")

// получаем колонку In Progress
const progress = document.getElementById("progress")

// получаем колонку Done
const done = document.getElementById("done")

// переменная для хранения карточки которую мы перетаскиваем
let draggedCard = null


// функция создания задачи
function createTask(text, column){

  // создаём новый HTML элемент div
  const card = document.createElement("div")

  // добавляем текст задачи
  card.innerText = text

  // добавляем CSS класс card
  card.classList.add("card")

  // разрешаем перетаскивание
  card.draggable = true


  // событие когда начинаем тянуть карточку
  card.addEventListener("dragstart", function(){

    // сохраняем карточку которую перетаскиваем
    draggedCard = card

  })


  // добавляем карточку в колонку
  column.appendChild(card)

}


// создаём задачи

createTask("Create login page", todo) 
// создаём карточку и кладём в колонку todo

createTask("Design homepage", progress) 
// задача сразу в колонке progress

createTask("Deploy website", done) 
// задача сразу в колонке done



// получаем все колонки
const columns = document.querySelectorAll(".column")

// перебираем каждую колонку
columns.forEach(function(column){

  // событие когда карточка находится над колонкой
  column.addEventListener("dragover", function(event){

    event.preventDefault() 
    // разрешаем бросить карточку

  })


  // событие когда карточку отпускают
  column.addEventListener("drop", function(){

    // добавляем перетаскиваемую карточку в колонку
    column.appendChild(draggedCard)

  })

})