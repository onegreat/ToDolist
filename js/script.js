const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
const todoRemove = document.querySelector('.todo-remove')
const toDo = JSON.parse(localStorage.getItem('toDo')) || []


const render = function () {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    toDo.forEach(function (item, idX, arr) {

        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete" ></button>' +
            '</div>'
        if (item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed
            render()
        })

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDo.splice(idX, 1)
            render()
        })
    })
    localStorage.setItem('toDo', JSON.stringify(toDo))
}


todoControl.addEventListener('submit', function (event) {
    event.preventDefault()
    if (headerInput.value.trim()) {
        const newToDo = {
            id: toDo.length,
            text: headerInput.value,
            completed: false
        }

        toDo.push(newToDo)
        headerInput.value = ''

        render()
    } else {
        headerInput.value = ''
    }
})

render()