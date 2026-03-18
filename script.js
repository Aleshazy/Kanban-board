const todo = document.getElementById("todo")
const progress = document.getElementById("progress")
const done = document.getElementById("done")
let draggedCard = null

function createTask(text, column) {
  const card = document.createElement("div")
  card.innerText = text
  card.classList.add("card")
  card.draggable = true

  const deleteBtn = document.createElement("button")
  deleteBtn.innerText = "×"
  deleteBtn.classList.add("delete-btn")
  deleteBtn.onclick = (e) => {
    e.stopPropagation()
    card.remove()
  }
  card.appendChild(deleteBtn)

  card.onclick = () => card.classList.toggle("selected")

  card.addEventListener("dragstart", () => draggedCard = card)
  column.appendChild(card)
}

createTask("Create login page", todo)
createTask("Design homepage", progress)
createTask("Deploy website", done)

document.querySelectorAll(".column").forEach(column => {
  column.addEventListener("dragover", e => e.preventDefault())
  column.addEventListener("drop", () => column.appendChild(draggedCard))
})

document.getElementById("loginBtn").onclick = () => alert("Login clicked")
document.getElementById("registerBtn").onclick = () => alert("Register clicked")

document.getElementById("addTaskBtn").onclick = () => {
  const text = document.getElementById("taskInput").value.trim()
  if (text) {
    createTask(text, todo)
    document.getElementById("taskInput").value = ""
  }
}

document.getElementById("selectAllBtn").onclick = () => {
  document.querySelectorAll(".card").forEach(card => card.classList.add("selected"))
}

document.getElementById("selectUncompletedBtn").onclick = () => {
  document.querySelectorAll(".card").forEach(card => {
    if (card.closest("#done")) {
      card.classList.remove("selected")
    } else {
      card.classList.add("selected")
    }
  })
}

document.getElementById("changeStatusBtn").onclick = () => {
  const selectedCards = document.querySelectorAll(".card.selected")
  const newStatus = document.getElementById("statusSelect").value
  const targetColumn = document.getElementById(newStatus)
  selectedCards.forEach(card => {
    card.classList.remove("selected")
    targetColumn.appendChild(card)
  })
}
