const types = ["weather", "fitness", "nutrition", "reading"];

window.onload = () => {
  types.forEach(loadData);
};

function getDate() {
  return new Date().toLocaleDateString();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function save(type, data) {
  localStorage.setItem(type, JSON.stringify(data));
}

function loadData(type) {
  const data = JSON.parse(localStorage.getItem(type)) || [];
  const ul = document.getElementById(type + "List");
  data.forEach(item => createItem(ul, item, type));
}

function createItem(ul, text, type) {
  const li = document.createElement("li");
  li.textContent = text;

  const del = document.createElement("button");
  del.textContent = "❌";
  del.className = "delete";
  del.onclick = () => {
    ul.removeChild(li);
    removeItem(type, text);
  };

  li.appendChild(del);
  ul.appendChild(li);
}

function removeItem(type, text) {
  let data = JSON.parse(localStorage.getItem(type)) || [];
  data = data.filter(i => i !== text);
  save(type, data);
}

function addItem(type, value) {
  if (!value) return;
  const entry = `${value} (${getDate()})`;
  const data = JSON.parse(localStorage.getItem(type)) || [];
  data.push(entry);
  save(type, data);
  createItem(document.getElementById(type + "List"), entry, type);
}

function logWeather() {
  addItem("weather", document.getElementById("weather").value);
}

function logFitness() {
  const i = document.getElementById("fitnessInput");
  addItem("fitness", i.value);
  i.value = "";
}

function logNutrition() {
  addItem("nutrition", document.getElementById("nutrition").value);
}

function logReading() {
  const i = document.getElementById("readingInput");
  addItem("reading", i.value);
  i.value = "";
}
