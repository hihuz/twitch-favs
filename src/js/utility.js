/*
  - exports utility used by other modules, so should be loaded first
  - contains only pure functions, for utility
  - produces no side effect, does not affect any other module
*/

// utility dom selector functions
export function $(selector, context = document) {
  return context.querySelector(selector);
}
export function $$(selector, context = document) {
  return [].slice.call(context.querySelectorAll(selector));
}
