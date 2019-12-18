const monsterContainer = document.querySelector("#monster-container"),
      back = document.querySelector("#back"),
      forward = document.querySelector("#forward"),
      form = document.querySelector("form");

let currentPage = 1;

function getMonsters(pageNumber) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(data => data.json())
        .then(displayMonsters)
        .catch(displayError);
}

function displayError(error) {
    const erm = document.querySelector('#modal');
    erm.innerText = error;
    erm.classList.remove("hidden");
    setTimeout(function() {erm.classList.add("hidden")}, 5000);
  }

function displayMonsters(monstersData) {
    const previousMonsters = document.querySelectorAll(".monster");
    if (previousMonsters.length !== 0) previousMonsters.forEach(m => m.remove());
    monstersData.forEach(displayMonster);
}

function displayMonster(monsterData) {

    const monsterEl = document.createElement('div'),
          name = document.createElement('h2'),
          age = document.createElement('h4'),
          description = document.createElement('p');

    name.innerText = monsterData.name;
    age.innerText = monsterData.age;
    description.innerText = monsterData.description;

    monsterEl.append(name, age, description);
    monsterEl.className = "monster";
    monsterContainer.append(monsterEl);

}

function postMonster(monsterData) {
    configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: monsterData[0],
          age: monsterData[1],
          description: monsterData[2]
        })
      };

    fetch("http://localhost:3000/monsters", configObj)
        .then(() => getMonsters(currentPage))
        .catch(displayError);
    ;
}

forward.addEventListener('click', e => {
    currentPage++ ;
    getMonsters(currentPage)
});

back.addEventListener('click', e => {
    if (currentPage !== 1) currentPage-- ;
    getMonsters(currentPage)
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const values = Array.from(e.target.querySelectorAll("input")).map(e => e.value);
    postMonster(values);
})

document.addEventListener("DOMContentLoaded", e => {
    getMonsters(currentPage);
})

