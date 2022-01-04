import { Enemy } from "./Enemy.js";
import { Spaceship } from "./Spaceship.js";

export default class Game {
   #htmlElements = {
      spaceShip: document.querySelector('[data-spaceship]'),
      container: document.querySelector('[data-container]'),
      scores: document.querySelector('[data-score]'),
      lives: document.querySelector('[data-lives]'),
      modal: document.querySelector('[data-modal]'),
      scoresModal: document.querySelector('[data-score-info]'),
      buttonModal: document.querySelector('[data-button]'),
   }

   #enemyProps = {
      smallEnemy: {
         enemyClass: 'enemy',
         explosionClass: 'explosion',
         enemySpeed: 30,
         enemyLives: 1,
      },
      bigEnemy: {
         enemyClass: 'enemy--big',
         explosionClass: 'explosion--big',
         enemySpeed: 60,
         enemyLives: 3,
      }
   }

   #statistics = {
      scores: 0,
      lives: 3,
   }

   #animationHitTime = 200;

   #spaceShip = new Spaceship(this.#htmlElements.spaceShip, this.#htmlElements.container);

   #enemy = [];

   #enemyInterval = null;
   #checkInterval = null;
   #hitTimeout = null;

   init() {
      this.#spaceShip.init();
      this.#newGame();
      this.#htmlElements.buttonModal.addEventListener('click', () => this.#newGame());
   }

   #newGame() {
      this.#htmlElements.modal.classList.add('hide');
      this.#enemyInterval = setInterval(() => this.#newEnemy(), 1000);
      this.#checkInterval = setInterval(() => this.#checkPosition(), 1);

   }

   #endGame() {
      this.#htmlElements.modal.classList.remove('hide');
      this.#htmlElements.scoresModal.innerHTML = `You loose! Your scores: ${this.#statistics.scores}`;

      this.#enemy.forEach(enemy => {
         enemy.explosion();
      });
      this.#enemy.length = 0;

      this.#statistics.scores = 0;
      this.#statistics.lives = 3;

      this.#htmlElements.scores.innerHTML = `Score: ${this.#statistics.scores}`;
      this.#htmlElements.lives.innerHTML = `Lives: ${this.#statistics.lives}`;

      clearInterval(this.#checkInterval);
      clearInterval(this.#enemyInterval);
   }

   #newEnemy() {
      const random = Math.floor(Math.random() * 5 + 1);

      if (random % 5) {
         const enemySmall = new Enemy(this.#htmlElements.container, this.#enemyProps.smallEnemy.enemyClass, this.#enemyProps.smallEnemy.explosionClass, this.#enemyProps.smallEnemy.enemySpeed, this.#enemyProps.smallEnemy.enemyLives);

         this.#enemy.push(enemySmall);
      }
      else {
         const enemyBig = new Enemy(this.#htmlElements.container, this.#enemyProps.bigEnemy.enemyClass, this.#enemyProps.bigEnemy.explosionClass, this.#enemyProps.bigEnemy.enemySpeed, this.#enemyProps.bigEnemy.enemyLives);

         this.#enemy.push(enemyBig);
      }
   }

   #checkPosition() {
      this.#enemy.forEach((enemy, enemyIndex, enemyArray) => {
         const enemyPosition = {
            top: enemy.element.offsetTop,
            right: enemy.element.offsetLeft + enemy.element.offsetWidth,
            bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
            left: enemy.element.offsetLeft,
         }

         if (enemyPosition.top > window.innerHeight) {
            enemy.removeElement();
            enemyArray.splice(enemyIndex, 1);
            this.decreaseLive();
         }

         this.#spaceShip.missles.forEach((missle, missleIndex, missleArray) => {
            const misslePosition = {
               top: missle.element.offsetTop,
               right: missle.element.offsetLeft + missle.element.offsetWidth,
               bottom: missle.element.offsetTop + missle.element.offsetHeight,
               left: missle.element.offsetLeft,
            }

            if (misslePosition.bottom >= enemyPosition.top &&
               misslePosition.top <= enemyPosition.bottom &&
               misslePosition.left <= enemyPosition.right &&
               misslePosition.right >= enemyPosition.left) {
               enemy.hit();
               if (!enemy.enemyLives) {
                  enemyArray.splice(enemyIndex, 1);
               }
               missle.removeElement();
               missleArray.splice(missleIndex, 1);
               this.addScore();
            }

            if (misslePosition.bottom < 0) {
               missle.removeElement();
               missleArray.splice(missleIndex, 1);
            }
         });


      })
   }

   addScore() {
      this.#statistics.scores++;
      this.#htmlElements.scores.innerHTML = `Score: ${this.#statistics.scores}`;
      this.fasterEnemies();
   }

   fasterEnemies() {
      if (!(this.#statistics.scores % 5) && this.#enemyProps.smallEnemy.enemySpeed > 0) {
         this.#enemyProps.smallEnemy.enemySpeed--;
         if (this.#enemyProps.bigEnemy.enemySpeed > 10) {
            this.#enemyProps.bigEnemy.enemySpeed -= 3;
         }
         console.log(this.#enemyProps.smallEnemy.enemySpeed);
         console.log(this.#enemyProps.bigEnemy.enemySpeed);
      }
   }

   decreaseLive() {
      this.#statistics.lives--;
      this.#htmlElements.lives.innerHTML = `Lives: ${this.#statistics.lives}`;
      this.#htmlElements.container.classList.add('hit');
      this.#hitTimeout = setTimeout(() => this.removeClassHit(), this.#animationHitTime);

      if (!this.#statistics.lives) {
         this.#endGame()
      }
   }

   removeClassHit() {
      this.#htmlElements.container.classList.remove('hit');
      clearTimeout(this.#hitTimeout);
   }
}
