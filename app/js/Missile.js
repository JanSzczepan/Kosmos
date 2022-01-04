export class Missile {
    constructor(container, x, y) {
        this.container = container;
        this.x = x;
        this.y = y;

        this.element = document.createElement('div');
        this.posYInterval = null;

        this.init();
    }

    init() {
        this.element.classList.add('missile');
        this.container.appendChild(this.element);
        this.element.style.left = `${this.x - this.element.offsetWidth / 2}px`;
        this.element.style.top = `${this.y - this.element.offsetHeight}px`;

        this.posYInterval = setInterval(() => this.element.style.top = `${parseInt(this.element.style.top) - 1}px`, 1);
    }

    removeElement() {
        clearInterval(this.posYInterval);
        this.element.remove();
    }
}