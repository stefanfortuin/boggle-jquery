import * as $ from 'jquery';
import '../scss/main.scss';
import board from './models/board';
import wordBasket from './models/wordBasket';
import boggle_word from './models/boggle_word';

$(document).ready(() => {
  window.wordBasket = new wordBasket();
  window.boggle_word = new boggle_word();
  window.board = new board();



});

