const BASE_URL = "http://localhost:3000/monsters/?_limit=50&_page=";
let PAGE = 1;
const POST_URL = "http://localhost:3000/monsters";

const init = () => {
  getAllMonsters();
  addNewMonster();
  forward();
  back();
};

const getAllMonsters = (page = PAGE) => {
  //   debugger;
  return fetch(BASE_URL + PAGE)
    .then(resp => resp.json())
    .then(renderAllMonsters);
};

const renderAllMonsters = monstersArray => {
  document.querySelector("#monster-container").innerHTML = "";
  for (const monster of monstersArray) {
    renderMonster(monster);
  }
};

const renderMonster = monster => {
  const mc = document.querySelector("#monster-container");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.innerText = monster.name;

  const h4 = document.createElement("h4");
  h4.innerText = `Age: ${monster.age}`;

  const p = document.createElement("p");
  p.innerText = monster.description;

  div.append(h2, h4, p);
  mc.append(div);
};

const addNewMonster = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const newMonsterName = document.querySelector("#name").value;
    const newMonsterAge = document.querySelector("#age").value;
    const newMonsterDesc = document.querySelector("#description").value;
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: newMonsterName,
        age: newMonsterAge,
        description: newMonsterDesc
      })
    };

    fetch(POST_URL, configObj)
      .then(resp => resp.json())
      .then(() => {
        document.querySelector("#monster-form").reset();
      });
  });
};

const forward = () => {
  const forwardBtn = document.querySelector("#forward");
  forwardBtn.addEventListener("click", () => {
    PAGE++;
    getAllMonsters(PAGE);
  });
};

const back = () => {
  const backBtn = document.querySelector("#back");
  backBtn.addEventListener("click", () => {
    if (PAGE > 0) {
      PAGE--;
      getAllMonsters(PAGE);
    }
  });
};

document.addEventListener("DOMContentLoaded", init);
