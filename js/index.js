const MONSTERS = "http://localhost:3000/monsters";
const LIMIT = "/?_limit=10&_page=";
let page = 1;
let limit = 50;

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

// back and forward buttons

const backButton = document.querySelector("#back");
backButton.innerHTML = "Back";
const forwardButton = document.querySelector("#forward");
forwardButton.innerHTML = "Forward";

// //////

const addForm = document.createElement("form");
const createButton = document.createElement("button");
createButton.innerHTML = "Create";

addForm.id = "monster-form";
const nameInput = document.createElement("input");
nameInput.id = "name";
nameInput.placeholder = "name...";
const ageInput = document.createElement("input");
ageInput.id = "age";
ageInput.placeholder = "age...";
const descriptionInput = document.createElement("input");
descriptionInput.id = "description";
descriptionInput.placeholder = "description...";
addForm.append(nameInput, ageInput, descriptionInput);
const CreateMonsterDiv = document.querySelector("#create-monster");
addForm.append(createButton);
CreateMonsterDiv.append(addForm);

// creating new Monsters

addForm.addEventListener("submit", e => {
  e.preventDefault();

  fetch(MONSTERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: nameInput.value,
      age: ageInput.value,
      description: descriptionInput.value
    })
  })
    .then(resp => resp.json())
    .then(data => {
      postNewMonster(data);
    });
});

// creating container where monsters will be displayed

const fetchData = a => {
  fetch(MONSTERS + `${LIMIT}${a}`)
    .then(resp => resp.json())
    .then(data => loop(data));
};

function loop(data) {
  data.forEach(element => {
    postNewMonster(element);
  });
}

function postNewMonster(obj) {
  const containerDiv = document.querySelector("#monster-container");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.innerHTML = obj.name;
  const h4 = document.createElement("h4");
  h4.innerHTML = `Age: ${obj.age}`;
  const p = document.createElement("p");
  p.innerHTML = `Bio: ${obj.description}`;
  div.append(h2, h4, p);
  containerDiv.append(div);
}
