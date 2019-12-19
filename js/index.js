const ALL_MOSTER_URL = "http://localhost:3000/monsters";
const MONSTER_URL = `${ALL_MOSTER_URL}/?_limit=50&_page=`;
let PAGE = 1;

document.addEventListener("DOMContentLoaded", () => {
  loadMonsters();
  addNewMonster();
  goBack();
  goForward();
});

const loadMonsters = (page = PAGE) => {
  fetch(MONSTER_URL + page)
    .then(resp => resp.json())
    .then(data => renderMonsters(data));
};

//Render Monsters
const renderMonsters = monsters => {
  monsterContainer.innerHTML = "";
  monsters.forEach(monster => {
    listMonster(monster);
  });
};

//listing monsters
const monsterContainer = document.querySelector("#monster-container");
const listMonster = monster => {
  const monsterDiv = document.createElement("div");
  monsterDiv.id = "monster";

  const eachMonsterDiv = document.createElement("div");
  eachMonsterDiv.id = "single-monster";

  const monsterNameH2 = document.createElement("h2");
  monsterNameH2.innerText = monster.name;

  const monsterBio = document.createElement("p");
  monsterBio.innerText = monster.description;

  const monsterAge = document.createElement("h4");
  monsterAge.innerText = `Age: ${monster.age}`;

  eachMonsterDiv.append(monsterNameH2, monsterAge, monsterBio);
  monsterDiv.append(eachMonsterDiv);
  monsterContainer.append(monsterDiv);
};

//add Even Listener on the FORWARD button
const goForward = () => {
  const forwardBtn = document.querySelector("#forward");
  forwardBtn.addEventListener("click", () => {
    PAGE++;
    loadMonsters(PAGE);
  });
};

//add Even Listener on the BACK button
const goBack = () => {
  const backBtn = document.querySelector("#back");
  backBtn.addEventListener("click", () => {
    if (PAGE > 1) {
      PAGE--;
      loadMonsters(PAGE);
    }
  });
};

// window.alert("there is no page").then(() => {
//   setTimeout(() => {
//     window.alert.remove();
//   }, 3000);
// });

// monster form
const createMonsterDiv = document.querySelector("#create-monster");

//form structure
const form = document.createElement("form");
form.id = "monster-form";

const nameInput = document.createElement("input");
nameInput.id = "new-name";
nameInput.placeholder = "name...";

const ageInput = document.createElement("input");
ageInput.id = "new-age";
ageInput.placeholder = "age...";

const descInput = document.createElement("input");
descInput.id = "new-desc";
descInput.placeholder = "description...";

const createBtn = document.createElement("button");
createBtn.type = "submit";
createBtn.innerText = "Create";
createBtn.style.cursor = "pointer";

form.append(nameInput, ageInput, descInput, createBtn);
createMonsterDiv.append(form);

//add Evenlistener on CREATE BUTTON
const addNewMonster = () => {
  const monsterForm = document.querySelector("#monster-form");
  monsterForm.addEventListener("submit", event => {
    event.preventDefault();

    const newName = document.querySelector("#new-name").value;
    const newAge = document.querySelector("#new-age").value;
    const newDesc = document.querySelector("#new-desc").value;

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: newName,
        age: newAge,
        description: newDesc
      })
    };

    fetch(ALL_MOSTER_URL, configObj)
      .then(resp => resp.json())
      .then(() => {
        document.querySelector("#monster-form").reset();
      });
  });
};
