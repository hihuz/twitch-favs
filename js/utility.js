/*jshint esversion:6 */
/*
  - exports utility used by other modules, so should be loaded first
  - contains only pure functions, for utility
  - produces no side effect, does not affect any other module
*/

const Utility = (function() {

  //utility dom selector functions
  function $(selector, context) {
    if (!context) { context = document; }
    return context.querySelector(selector);
  }
  function $$(selector, context) {
    if (!context) { context = document; }
    return [].slice.call(context.querySelectorAll(selector));
  }

  return {
    $: $,
    $$: $$,
  }

})();