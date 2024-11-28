import Elements from "./elements.js";

class Controller {
  constructor(cardsNumber) {
    this.elements = new Elements(cardsNumber);
  }
}

export default Controller;
