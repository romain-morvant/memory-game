import Elements from "./elements.js";

class Controller {
  constructor(cardsNumber) {
    this.elements = new Elements(cardsNumber);
    this.prevCard;
    this.clickCard();
    this.startClock = true;
    this.time;
  }

  clickCard() {
    // Récupération des cartes et du nombre de tentatives
    const { attempts, cards } = this.elements;
    cards.forEach((card) => {
      // Incrémentation de la valeur 'click'
      card.addEventListener("click", () => {
        this.startClock && this.setTime();
        attempts.click++;
        card.classList.add("change");
        // Si deux cartes sont retournées (ont la classe change)
        if (attempts.click === 2) {
          cards.forEach((card) => {
            // Ajout de la classe 'pause' aux cartes
            card.classList.add("pause");
            setTimeout(() => {
              card.classList.remove("pause");
              // Le tout après 1000ms => 1s
            }, 1000);
          });
          // Si la carte cliquée précédemment est la même que celle cliquée à l'instant
          if (this.prevCard.dataset.index === card.dataset.index) {
            // Incrémentation de la valeur 'correct'
            attempts.correct++;
            // Ajout de la classe 'stop' à la carte
            card.classList.add("stop");
            // Ajout de la classe 'stop' à la carte précédemment cliquée
            this.prevCard.classList.add("stop");
          }
          // Si la carte cliquée précédemment n'est pas la même que celle cliquée à l'instant
          else {
            // Incrémentation de la valeur 'wrong'
            attempts.wrong++;
            setTimeout(() => {
              // Retrait de la classe 'change' de la carte
              card.classList.remove("change");
              // Retrait de la classe 'change' de la carte précédemment cliquée
              this.prevCard.classList.remove("change");
              // Le tout après 1000ms => 1s
            }, 1000);
          }
          // Remise a 0 du compteur de clicks
          attempts.click = 0;
          this.endGame(attempts);
          console.log(attempts.correct, attempts.wrong);
        } else {
          this.prevCard = card;
        }
        this.startClock = false;
      });
    });
  }

  endGame({ correct }) {
    const { cardsNumber, modal, modalBtn, wrong, attempts, timer, modalTime } =
      this.elements;
    if (correct === cardsNumber / 2) {
      console.log("Bien ouèj!");
      this.startClock = true;
      this.stopTime();
      modal.style.cssText = "visibility: visible; opacity:1;";
      const timerClone = timer.cloneNode(true);
      modalTime.append(timerClone);
      wrong.textContent = attempts.wrong;
      modalBtn.onclick = () => location.reload();
    } else {
      console.log("Pas encore :/");
    }
  }

  setTime() {
    let int = 1;
    const { timer } = this.elements;

    this.time = setInterval(() => {
      const seconds = int % 60;
      timer.children[1].innerHTML = seconds > 9 ? seconds : `0${seconds}`;
      const minutes = Math.floor(int / 60);
      timer.children[0].innerHTML = minutes > 9 ? minutes : `0${minutes}`;
      int++;
    }, 1000);
  }

  stopTime() {
    clearInterval(this.time);
  }
}

export default Controller;
