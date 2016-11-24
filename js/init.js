/*jshint esversion:6 */
(function(global) {
  global.EV = new EventEmitter();

  document.addEventListener('DOMContentLoaded', function() {
    EV.emit("init");
  });

})(window);