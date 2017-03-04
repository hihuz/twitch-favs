// (function (global) {
//   global.EV = new EventEmitter();

//   document.addEventListener('DOMContentLoaded', () => {
//     EV.emit('init');
//   });
// }(window));

import EventEmitter from 'eventemitter3';
import * as fromAppLogic from './app-logic';
import * as fromUserInput from './user-input';
import * as fromView from './view';

const EV = new EventEmitter();

document.addEventListener('DOMContentLoaded', () => {
  fromAppLogic.init();
  fromUserInput.init();
  fromView.init();
});

export default EV;
