class Elements {
  constructor(cardsNumber) {
    this.cardsNumber = cardsNumber;
    this.playground = document.querySelector(".playground");
    this.createCard();
  }

  createCard() {
    console.log(this.cardsNumber);
  }
}

export default Elements;
