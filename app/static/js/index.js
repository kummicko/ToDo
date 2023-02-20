const addBtn = document.querySelector('#addBtn')
const inp = document.querySelector('#inp')
let lst = document.querySelector('.container')
let markButtons = lst.querySelectorAll('.complete-button')
let deleteButtons = lst.querySelectorAll('.delete-button')
let updateButtons = lst.querySelectorAll('.update-button')
const listViewButton = document.querySelector('#listViewButton')
const gridViewButton = document.querySelector('#gridViewButton')
let cardsNode = document.querySelectorAll('.card')
let cards = Array.from(cardsNode)

gridViewButton.addEventListener('click', () => {
    if(window.innerWidth > 600 && window.innerWidth < 900) {
        lst.style.gridTemplateColumns = "1fr 1fr"
        cards.forEach((card) => card.classList.remove('flex-card'))
    }else if(window.innerWidth > 900) {
        lst.style.gridTemplateColumns = "repeat(3, 1fr)"
        cards.forEach((card) => card.classList.remove('flex-card'))
    }
})

listViewButton.addEventListener('click', () => {
    lst.style.gridTemplateColumns = "1fr";
    cards.forEach((card) => card.classList.add('flex-card'))
})

addBtn.addEventListener('click', () => {
    let text = inp.value
    if (text == '') {
        alert('task cannot be empty')
    } else {
        sendNewData(text)
    }
})

markButtons.forEach( (markButton) => {
    markButton.addEventListener('click', () => {
        markTaskCompleted(markButton)
    })
})

deleteButtons.forEach( (deleteButton) => {
    deleteButton.addEventListener('click', () => {
        deleteTask(deleteButton)
    })
})

updateButtons.forEach( (updateButton) => {
    updateButton.addEventListener('click', () => {
        document.querySelector('#form').reset()
        let text = updateButton.parentNode.previousElementSibling
        document.querySelector('#dialogText').innerText = text.innerText
        document.querySelector('#confirmBtn').dataset.id = updateButton.dataset.value
        updateDialog.showModal();
    })
})

updateDialog.addEventListener('close', function () {
        updateTask()
    });

function updateTask () {
    let id = document.querySelector('#confirmBtn').dataset.id
    let newText = document.querySelector('#dialogText').value
    let body = document.querySelector(`#card-body${id}`)
    updateTaskText(id, newText, body)
}

async function updateTaskText(id, newText, body) {
    try {
        const response = await fetch('/update_text', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                task: newText
            })
        })
        const resp = await response.json();
        console.log(resp)
        body.innerText = newText
    } catch(error) {
        console.log('Fetch error: ', error);
    }
}

async function markTaskCompleted(markButton) {
    try {
        const response = await fetch('/mark_done', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                id: markButton.dataset.value
            })
        })
        const resp = await response.json();
        console.log(resp)
        createDeleteButton(markButton)
    } catch(error) {
        console.log('Fetch error: ', error);
    }
}

async function deleteTask(deleteButton) {
    try {
        const response = await fetch('/delete', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({
                id: deleteButton.dataset.value
            })
        })
        const resp = await response.json();
        console.log(resp)
        removeTask(deleteButton)
    } catch(error) {
        console.log('Fetch error: ', error);
    }
}

async function sendNewData(text) {
    try {
        const response = await fetch('/add', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                task: text
            })
        })
        const resp = await response.json();
        console.log(resp)
        addToList(text, resp.id, resp.timestamp)
    } catch(error) {
        console.log('Fetch error: ', error);
    }
}

function addToList(text, id, timestamp) {
    const container = document.querySelector('.container')
    const card = document.createElement('div')
    card.classList.add('card')
    if(window.innerWidth > 600 && lst.style.gridTemplateColumns == "1fr"){
        card.classList.add('flex-card')
    }
    const header = document.createElement('div')
    header.classList.add('card-header')
    header.innerHTML = `Created ${timestamp}`
    const body = document.createElement('div')
    body.innerHTML = text
    body.id = `card-body${id}`
    body.classList.add('card-body')
    const footer = document.createElement('div')
    footer.classList.add('card-footer')
    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<span>&#x2714;</span> Mark Completed'
    completeButton.dataset.value = id
    completeButton.classList.add('complete-button')
    completeButton.addEventListener('click', () => {
        markTaskCompleted(completeButton)
    })
    const updateButton = document.createElement('button')
    updateButton.innerHTML = '<span>&#x270E;</span> Update'
    updateButton.dataset.value = id
    updateButton.classList.add('update-button')
    updateButton.addEventListener('click', () => {
        document.querySelector('#form').reset()
        let text = updateButton.parentNode.previousElementSibling
        document.querySelector('#dialogText').innerText = text.innerText
        document.querySelector('#confirmBtn').dataset.id = updateButton.dataset.value
        updateDialog.showModal();
    })
    footer.appendChild(updateButton)
    footer.appendChild(completeButton)
    container.appendChild(card)
    card.appendChild(header)
    card.appendChild(body)
    card.appendChild(footer)
    cards.push(card)
}

function createDeleteButton(markButton) {
    const parent = markButton.parentNode
    const id = markButton.dataset.value
    const delButton = document.createElement("button");
    delButton.innerHTML = '<span>&#x2717;</span> Delete'
    delButton.classList.add('delete-button')
    delButton.dataset.value = id;
    delButton.addEventListener('click', () => {
        deleteTask(delButton)
    })
    parent.previousElementSibling.classList.add('line-through')
    markButton.previousElementSibling.style.display = 'none'
    markButton.style.display = 'none'
    parent.appendChild(delButton)
    parent.parentNode.classList.add('completed-task')
}

function removeTask(deleteButton) {
    let animatedCard = deleteButton.parentNode.parentNode
    getAbsolutePosition()
    freezeAll()
    currIndex = cards.indexOf(animatedCard)
    console.log(currIndex)
    animatedCard.classList.add('zoom')
    setTimeout(function() {
        animatedCard.remove()
        while(currIndex < cards.length - 1) {
            nextIndex = currIndex + 1
            cards[nextIndex].style.left = `${cards[currIndex].dataset.left}px`
            cards[nextIndex].style.top = `${cards[currIndex].dataset.top}px`
            currIndex ++
        }
    }, 300)
    setTimeout(() => {
        cards = cards.filter(card => card !== animatedCard)
        removeAbsolutePosition()
    }, 1200)
}

function getAbsolutePosition() {
    cards.forEach((card) => {
        card.dataset.left = card.getBoundingClientRect().left
        card.dataset.top = card.getBoundingClientRect().top
        card.dataset.width = card.getBoundingClientRect().width
        card.dataset.height = card.getBoundingClientRect().height
    })
}

function freezeAll() {
    cards.forEach((card) => {
        card.style.position = 'absolute'
        card.style.left = `${card.dataset.left}px`
        card.style.top = `${card.dataset.top}px`
        card.style.width = `${card.dataset.width}px`
        card.style.height = `${card.dataset.height}px`
    })
}

function removeAbsolutePosition() {
    cards.forEach((card) => {
    card.style.position = 'static'
    card.style.width = ''
    card.style.height = ''
    })
}

window.addEventListener('resize', function(event) {
    if(window.innerWidth < 600){
        lst.style.gridTemplateColumns = '1fr'
        cards.forEach((card) => card.classList.remove('flex-card'))
    }else if(window.innerWidth > 600 && window.innerWidth <900){
        lst.style.gridTemplateColumns = '1fr 1fr'
        cards.forEach((card) => card.classList.remove('flex-card'))
    }else if(window.innerWidth > 900){
        lst.style.gridTemplateColumns = '1fr 1fr 1fr'
        cards.forEach((card) => card.classList.remove('flex-card'))
    }
}, true);