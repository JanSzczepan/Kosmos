import './index.scss';
import Game from './js/Game';

// document.addEventListener('DOMContentLoaded', () => {
//    const game = new Game();
//    game.init();
// });

window.onload = function() {
   const game = new Game();
   game.init();
}