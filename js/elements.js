class Elements {
  constructor(cardsNumber) {
    this.cardsNumber = cardsNumber;
    this.playground = document.querySelector(".playground");
    this.cardsIndex = [];
    this.doubleIndex();
    this.createCard();

    this.cards = document.querySelectorAll(".card");
    this.attempts = {
      correct: 0,
      wrong: 0,
      click: 0,
    };

    this.modal = document.querySelector(".modal");
    this.modalBtn = document.querySelector(".modal-btn");
    this.wrong = document.querySelector(".wrong");
    this.restartBtn = document.querySelector(".restart-btn");
    this.timer = document.querySelector(".timer");
    this.modalTime = document.querySelector(".modal-time");

    this.restartGame();
  }

  // Mélange des index des images avant disposition
  shuffleIndexes(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Doublage de l'index histoire d'avoir des paires d'images
  doubleIndex() {
    for (let i = 1; i <= this.cardsNumber; i++) {
      i <= this.cardsNumber / 2
        ? this.cardsIndex.push(i)
        : this.cardsIndex.push(i - this.cardsNumber / 2);
    }

    // console.log(this.cardsIndex);
  }

  // Création de la carte
  createCard() {
    // console.log(this.cardsNumber);

    // Définition du nombre de lignes dépendant du nombre choisi au dessus.
    this.playground.style.gridTemplateRows = `repeat(${Math.sqrt(
      this.cardsNumber
    )}, 1fr)`;
    // Définition du nombre de colonnes dépendant du nombre choisi au dessus.
    this.playground.style.gridTemplateColumns = `repeat(${Math.sqrt(
      this.cardsNumber
    )}, 1fr)`;

    // Mélange des index juste avant de créer la carte
    this.shuffleIndexes(this.cardsIndex).forEach((index) => {
      // Création de la variable card qui est une div.
      const card = document.createElement("div");
      // Ajout de la classe 'card' à la div.
      card.classList.add("card");
      // Ajout de l'attribut 'data-index' à la div card.
      card.setAttribute("data-index", index);

      // Création de la variable img qui est un élément img.
      const img = document.createElement("img");
      // Définition de la source de l'élément img.
      img.src = `images/icon-${index}.png`;
      // Ajout de l'image à la carte.
      card.append(img);
      this.playground.append(card);
    });
  }

  // Redémarrage du jeu
  restartGame() {
    this.restartBtn.onclick = () => {
      this.modal.style.cssText =
        "visibility: visible; opacity: 1; transition: opacity .5s";
      const modalContent = this.modal.firstElementChild;
      modalContent.innerHTML =
        "<h2 class='modal-text'>Veux tu nous quitter ? :(</h2><div><button class='btn yes-btn'>Oui :D</button><button class='btn cancel-btn'>Non !</button></div>";
      modalContent.querySelector(".cancel-btn").onclick = () => {
        this.modal.style.cssText =
          "visibility: hidden;opacity:0;transition: opacity .5s";
      };
      modalContent.querySelector(".yes-btn").onclick = () => {
        location.reload();
      };
    };
  }
}

export default Elements;
