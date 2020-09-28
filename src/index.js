import "./styles.css";
import { createStore } from "redux";
import { rootReducer } from "../src/redux/rootReducer";
import logger from "redux-logger";
import {
  decrement,
  increment,
  changeTheme,
  disableButtons,
  enableButtons,
  asyncIncrement
} from "./redux/actions";
import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asnBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

// function logger(state) {
//   return function(next) {
//     return function(action) {
//       return newxt(action);
//     };
//   };
// }

const store = createStore(
  rootReducer,
  0,
  applyMiddleware(thunk, logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.store = store;

addBtn.addEventListener("click", () => {
  store.dispatch(increment());
});

subBtn.addEventListener("click", () => {
  store.dispatch(decrement());
});

asnBtn.addEventListener("click", () => {
  store.dispatch(asyncIncrement());
});

themeBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  store.dispatch(changeTheme(newTheme));
  //    document.body.classList.toggle("dark");
});
// render();

store.subscribe(() => {
  const state = store.getState();

  counter.textContent = state.counter;
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asnBtn].forEach(btn => {
    btn.disabled = state.theme.disabled;
  });
});

store.dispatch({ type: "INIT_APPLICATION" });
