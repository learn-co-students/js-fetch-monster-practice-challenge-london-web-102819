URL = "http://localhost:3000/monsters"


document.addEventListener('DOMContentLoaded', function(){
    getNFifty(1)
    addNavButtons()
    addForm()
})

const getNFifty = n => {
    const container = document.querySelector('#monster-container')
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    fetch(URL + `/?_limit=50&_page=${n}`)
        .then(resp => resp.json())
        .then(renderMonsters)

    let page = document.createElement('h4'); page.innerText = `Page number: ${n}`; 
    container.appendChild(page);
}

const renderMonsters = monsterHash => {
    const container = document.querySelector('#monster-container')
    monsterHash.forEach(function(m) {
        let div = document.createElement('div'); div.id = m.id
        let name = document.createElement('h2'); name.innerText = m.name;
        let age = document.createElement('h4'); age.innerText = `Age: ${m.age}`;
        let desc = document.createElement('p'); desc.innerText = `Description: ${m.description}`;

        div.appendChild(name); div.appendChild(age); div.appendChild(desc); 
        container.appendChild(div)
    })
}

const addNavButtons = () => {
    pageUp()
    pageDown()
}

const pageUp = () => {
    const button = document.querySelector('#forward');
    button.addEventListener('click', function() {
        let page = parseInt(document.querySelector('#monster-container h4').innerText.split(" ")[2])
        if (page < 21) {
            getNFifty(page + 1)
        }
    });
}

const pageDown = () => {
    const button = document.querySelector('#back');
    button.addEventListener('click', function() {
        let page = parseInt(document.querySelector('#monster-container h4').innerText.split(" ")[2])
        if (page > 1) {
            getNFifty(page - 1)
        }
    });
}

const addForm = () => {
    const createMonster = document.querySelector('#create-monster')
    const form = document.createElement('form'); form.id = 'create-monster-form'
    createForm(form)
    createMonster.appendChild(form)
}

const clearForm = () => {
    document.querySelector("#create-monster-form").reset();
}

const createForm = form => {
    const name = document.createElement('input'); name.placeholder = 'name...'; name.name = 'name';
    const age = document.createElement('input'); age.placeholder = 'age...'; age.name = 'age';
    const desc = document.createElement('input'); desc.placeholder = 'description...'; desc.name = 'desc';
    const submit = document.createElement('input'); submit.value = 'submit'; submit.type = 'submit';

    form.appendChild(name); form.appendChild(age); form.appendChild(desc); form.appendChild(submit);
    form.addEventListener('submit', e => {
        e.preventDefault()
        addMonster(e.target)
    });
}

const addMonster = (formData) => {
    let name = formData.name.value;
    let age = formData.age.value;
    let desc = formData.desc.value;

    let formInfo = {
        name: name,
        age: age,
        desc: desc
    };

    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        body: JSON.stringify(formInfo)
    };

    fetch(URL, configObj).then(resp => resp.json()).then(getNFifty(1)).then(clearForm())
}