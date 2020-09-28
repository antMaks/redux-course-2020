import "./styles.css";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asnBtn = document.getElementById("async");
const ThemeBtn = document.getElementById("theme");

const render = () => {
  counter.textContent = state.toString();
};
let state = 0;

addBtn.addEventListener("click", () => {
  state++;
  render();
});

subBtn.addEventListener("click", () => {
  if (state) state--;
  render();
});

asnBtn.addEventListener("click", () => {
  setTimeout(() => {
    state++;
    render();
  }, 2000);
  state--;
  render();
});

ThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
render();
