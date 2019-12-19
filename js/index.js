document.addEventListener('DOMContentLoaded', function(){
    allmonsters();
    createSingleMonsterList();
});


const BASE_URL = "http://localhost:3000/monsters/?_limit=20&_page=3"
const MONSTER_URL = "http://localhost:3000/monsters"


function allmonsters() {
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => eachMonster(data));
};


function createSingleMonsterList() {
    const div = document.querySelector("#create-monster")
    const form = document.createElement("form")
  

    const input = document.createElement("input")
    input.name = "name"
    input.placeholder = "name..."
    const input2 = document.createElement("input")
    input2.name = "age"
    input2.placeholder = "age...."
    const input3 = document.createElement("input")
    input3.name = "description"
    input3.placeholder = "description.."

    const button = document.createElement("button")
    button.innerText = "Create"

    form.addEventListener("submit", e => postNewMonster(e))

    form.append(input, input2, input3, button)
    div.append(form)

    return div 
};

function createListOfMonsters(m) {
    const div = document.querySelector("#monster-container")
    const h2 = document.createElement("h2")
    const h4 = document.createElement("h4")
    const p = document.createElement("p")

    h2.innerText = m.name 
    h4.innerText = m.age 
    p.innerText = m.description 

    div.append(h2, h4, p)

    return div 
}

function eachMonster(monsters) {
    monsters.forEach(monster => {
        createListOfMonsters(monster)
    })
}


const postNewMonster = (e) => {
    e.preventDefault();

    const newName = e.target.name.value
    const newAge = e.target.age.value
    const newDesc = e.target.description.value

    fetch(MONSTER_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        accept: "application/json",
        body: JSON.stringify({
            name: newName,
            age: newAge,
            description: newDesc
        })
        
    }).then(resp => resp.json())
    .then(data => {createListOfMonsters(data)})
    .then(() => {
    //     document.querySelector("#monster-form").reset();                                                                                                                                                                                                                                                                                                                                                                                                          
    // })
}
