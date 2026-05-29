const todo = document.getElementById("todo")
const progress = document.getElementById("progress")
const done = document.getElementById("done")
let draggedCard = null

function createTask({title, description = '', badge = '', badgeType = '', selected = false}, column) {
  const card = document.createElement("div")
  card.classList.add("card")
  if (selected) card.classList.add("selected")
  card.draggable = true

  const titleEl = document.createElement('div')
  titleEl.className = 'title'
  titleEl.innerText = title
  card.appendChild(titleEl)

  if (description) {
    const desc = document.createElement('div')
    desc.className = 'meta'
    desc.innerText = description
    card.appendChild(desc)
  }

  if (badge) {
    const b = document.createElement('div')
    b.className = 'badge ' + badgeType
    b.innerText = badge
    card.appendChild(b)
  }

  const deleteBtn = document.createElement("button")
  deleteBtn.innerText = "×"
  deleteBtn.classList.add("delete-btn")
  deleteBtn.onclick = (e) => {
    e.stopPropagation()
    card.remove()
    updateCounts()
  }
  card.appendChild(deleteBtn)

  card.onclick = () => card.classList.toggle("selected")

  card.addEventListener("dragstart", (e) => {
    draggedCard = card
    try{ e.dataTransfer.setData('text/plain', 'drag') }catch(e){}
  })
  card.addEventListener("dragend", () => { draggedCard = null; updateCounts() })

  column.appendChild(card)
  updateCounts()
  return card
}

document.querySelectorAll(".column").forEach(column => {
  column.addEventListener("dragover", e => e.preventDefault())
  column.addEventListener("drop", (e) => {
    e.preventDefault()
    if (draggedCard) {
      column.appendChild(draggedCard)
      draggedCard.classList.remove('selected')
      updateCounts()
    }
  })
})

document.getElementById("loginBtn").onclick = () => alert("Login clicked")
document.getElementById("registerBtn").onclick = () => alert("Register clicked")

document.getElementById("addTaskBtn").onclick = () => {
  const text = document.getElementById("taskInput").value.trim()
  if (text) {
    createTask({title: text}, todo)
    document.getElementById("taskInput").value = ""
  }
}

document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("addTaskBtn").click()
  }
})

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
  updateCounts()
}

document.addEventListener('keydown', (e)=>{
  if(e.key === ' ' || e.key === 'Spacebar'){
    const active = document.activeElement
    if(active && active.classList && active.classList.contains('card')){
      e.preventDefault()
      active.classList.toggle('selected')
    }
  }
})

function updateCounts(){
  const todoCount = document.querySelectorAll('#todo .card').length
  const progCount = document.querySelectorAll('#progress .card').length
  const doneCount = document.querySelectorAll('#done .card').length
  document.querySelectorAll('.count').forEach(el=>{
    const forId = el.getAttribute('data-for')
    if(forId === 'todo') el.innerText = todoCount
    if(forId === 'progress') el.innerText = progCount
    if(forId === 'done') el.innerText = doneCount
  })
}

// sample tasks matching Figma design
createTask({title: 'Create login page', description: 'Auth screen, primary CTA, social sign-in row', badge: 'High', badgeType: 'high'}, todo)
createTask({title: 'Write onboarding copy', description: 'Short product value statement and helper text', badge: 'Medium', badgeType: 'medium'}, todo)
createTask({title: 'Design homepage', description: 'Hero block, board layout, mobile view', badge: 'Selected', badgeType: 'medium', selected: true}, progress)
createTask({title: 'Plan drag and drop states', description: 'Hover, selected, empty-col and drop indicators', badge: 'Ready', badgeType: 'medium'}, progress)
createTask({title: 'Deploy website', description: 'Production build, check auth CTA and board interactions', badge: 'Done', badgeType: 'done'}, done)

updateCounts()
