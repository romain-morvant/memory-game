import Controller from "./js/controller.js";

const selectCellsNumber = document.querySelector(".select-cells-number");

const game = new Controller(selectCellsNumber.value);

selectCellsNumber.addEventListener("change", (e) => {
  document.querySelector(".playground").innerHTML = "";

  const newGame = new Controller(e.target.value);
});
