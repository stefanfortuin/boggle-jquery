import * as $ from 'jquery';
import '../scss/main.scss';
import board from './models/board';
import wordBasket from './models/wordBasket';
import boggleWord from './models/boggleWord';
import lineDrawer from './models/lineDrawer';

$(document).ready(() => {
  window.wordBasket = new wordBasket();
  window.boggleWord = new boggleWord();
  window.lineDrawer = new lineDrawer();
  window.board = new board();
});

