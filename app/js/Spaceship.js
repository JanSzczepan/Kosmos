import { Missile } from "./Missile.js";

const SPACE_SHIP_MOVEMENT = 5;

export class Spaceship {

   constructor(spaceShip, container) {
      this.spaceShip = spaceShip;
      this.container = container;

      this.leftArrow = false;
      this.rightArrow = false;

      this.missles = [];
   }

   init() {
      this.#setPosition();
      this.#eventListeners();
      this.#gameLoop();
   }

   #setPosition() {
      this.spaceShip.style.bottom = '0';
      this.spaceShip.style.left = `${window.innerWidth / 2 - this.#getPosition()}px`;
   }

   #getPosition() {
      return this.spaceShip.offsetLeft + this.spaceShip.offsetWidth / 2;
   }

   #eventListeners() {
      window.addEventListener('keydown', e => this.#keydown(e));
      window.addEventListener('keyup', e => this.#keyup(e));
   }

   #keydown = e => {
      switch (e.keyCode) {
         case 37:
            this.leftArrow = true;
            break;
         case 39:
            this.rightArrow = true;
            break;
      }
   }

   #keyup = e => {
      switch (e.keyCode) {
         case 37:
            this.leftArrow = false;
            break;
         case 39:
            this.rightArrow = false;
            break;
         case 32:
            this.shoot();
            break;
      }
   }

   #gameLoop = () => {
      this.#moveSpaceShip();
      requestAnimationFrame(this.#gameLoop);
   }

   #moveSpaceShip() {
      if (this.leftArrow && this.#getPosition() >= this.spaceShip.offsetWidth / 2) {
         this.spaceShip.style.left = `${parseInt(this.spaceShip.style.left) - SPACE_SHIP_MOVEMENT}px`;
      }
      else if (this.rightArrow && this.#getPosition() <= (window.innerWidth - this.spaceShip.offsetWidth / 2)) {
         this.spaceShip.style.left = `${parseInt(this.spaceShip.style.left) + SPACE_SHIP_MOVEMENT}px`;
      }
   }

   shoot() {
      const missile = new Missile(
         this.container,
         this.#getPosition(),
         this.spaceShip.offsetTop
      );

      this.missles.push(missile);
   }
}