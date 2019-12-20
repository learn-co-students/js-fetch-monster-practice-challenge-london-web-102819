// API Calls
const apiUrl = 'http://localhost:3000/monsters/?_limit=50&_page=1'

const getAllMosters = () => {
    return fetch(apiUrl).then(response => response.json())
}

// create a Monster
const createMonster = (monsterObject) => {
    return fetch(`http://localhost:3000/monsters`, {
        method: 'POST',
        headers: 
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monsterObject)
    }).then(resp => resp.json())
}



const createForm = () => {
    const formDiv = document.querySelector('#create-monster')
    const createForm = document.createElement('form')
    const createNameInput = document.createElement('input')
    createNameInput.placeholder = "Name"
    createNameInput.name = "Name"

    const createAgeInput = document.createElement('input')
    createAgeInput.placeholder = "Age"
    createAgeInput.name = "Age"

    const createDescriptionInput = document.createElement('input')
    createDescriptionInput.placeholder = "Description"
    createDescriptionInput.name = "Description"

    const submitBtn = document.createElement('button')
    submitBtn.innerText = 'Add Monster'

    createForm.append(createNameInput, createAgeInput, createDescriptionInput, submitBtn)
    formDiv.append(createForm)
    return formDiv
}


const generateMonster = (monster) => {
    const monsterContainerDiv = document.querySelector('#monster-container')
    const createMonsterDiv = document.createElement('div')
    createMonsterDiv.id = `monster-${monster.id}`
    const quoteHtml = `
        <p>${monster.name}</p>
        <p>${monster.age}</p>
        <p>${monster.description}</p>
        `
    createMonsterDiv.innerHTML = quoteHtml
    monsterContainerDiv.append(createMonsterDiv)
}

const generateMonsters = (monsters) => {
    monsters.forEach(generateMonster)
    
}

init = () => {
    createForm()
    getAllMosters().then(generateMonsters)

    const form = document.querySelector('form')

    form.addEventListener('submit', (e)=> {
        e.preventDefault()
        const name = form.elements['Name'].value
        const age = form.elements['Age'].value
        const description = form.elements['Description'].value
        const monsterObject = {
            name,
            age,
            description
        }
        createMonster(monsterObject).then(monster => generateMonster(monster))
    })

    form.reset()

}

document.addEventListener("DOMContentLoaded", init)
