export class Enemy {
    constructor(container, enemyClass, explosionClass, enemySpeed, enemyLives) {
        this.container = container;
        this.enemyClass = enemyClass;
        this.explosionClass = explosionClass;
        this.enemySpeed = enemySpeed;
        this.enemyLives = enemyLives;

        this.element = document.createElement('div');

        this.enemyInterval = null;
        this.enemyTimeout = null;

        this.init();
    }

    init() {
        this.newEnemy();
    }

    newEnemy() {
        this.element.classList.add(this.enemyClass);
        this.container.appendChild(this.element);
        this.element.style.top = '0px';
        this.element.style.left = `${this.randomPosition()}px`;

        this.setEnemyMoveDown();
    }

    randomPosition() {
        return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth));
    }

    setEnemyMoveDown() {
        this.enemyInterval = setInterval(() => this.enemyMoveDown(), this.enemySpeed);
    }

    enemyMoveDown() {
        this.element.style.top = `${parseInt(this.element.style.top) + 1}px`;
    }

    hit() {
        this.enemyLives--;

        if (!this.enemyLives) {
            this.explosion();
        }
    }

    explosion() {
        this.element.classList.remove(this.enemyClass);
        this.element.classList.add(this.explosionClass);

        const time = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--explosions-animation-time'), 10);
        this.enemyTimeout = setTimeout(() => this.removeElement(), time);
    }

    removeElement() {
        this.element.remove();
        clearInterval(this.enemyInterval);
        clearTimeout(this.enemyTimeout);
    }
}