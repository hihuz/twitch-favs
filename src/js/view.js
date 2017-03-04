/*
  - listens to the app-logic module events
  - can access the dom and update it based off events recieved from the store
  - should be as passive as possible, handlers need to be
    there but should delegate the logic to user-input module
  - passes all user actions by way of events to user-input module
*/

// TODO -----------> !!!!!!!! the actual logic for alert close click
// should be in user-input to be consistent.. !!!!!!!!!!!!!
// ^^ or maybe the other way around..

import EV from './init';
import { $, $$ } from './utility';

const streamTemplate = $('.stream-template .stream');
const add = $('.add-button');
const addContent = $('.add-box-content');
const addInput = $('.add-box-input');
const addBox = $('.add-box');
const addBoxValidate = $('.add-box-validate');
const body = $('body');
const main = $('main');
const loader = $('.loader');
const overlay = $('.overlay');
const dialog = $('.dialog');
const dialogMsg = $('.dialog-message');
const dialogConfirm = $('.dialog-confirm');
const dialogCancel = $('.dialog-cancel');
const alert = $('.alert');
const alertMsg = $('.alert-message');
const alertClose = $('.alert-close');

/** ** RENDERING FUNCTIONS BELOW ****/
// basic template courtesy of eloquentjavascript
function instantiateTemplate(template, values) {
  function instantiateText(text, values) {
    return text.replace(/\{\{(\w+)\}\}/g, (_, name) => values[name]);
  }
  function instantiate(node, values) {
    if (node.nodeType === document.ELEMENT_NODE) {
      const copy = node.cloneNode();
      for (let i = 0; i < node.childNodes.length; i += 1) {
        copy.appendChild(instantiate(node.childNodes[i], values));
      }
      return copy;
    } else if (node.nodeType === document.TEXT_NODE) {
      return document.createTextNode(
               instantiateText(node.nodeValue, values));
    }
    return node;
  }
  return instantiate(template, values);
}

function hideLoader() {
  loader.classList.add('hidden');
  overlay.classList.add('hidden');
}
function showLoader() {
  loader.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
function hideDialog() {
  dialog.classList.add('hidden');
  overlay.classList.add('hidden');
}
function showDialog(msg) {
  dialogMsg.textContent = msg;
  dialog.classList.remove('hidden');
  overlay.classList.remove('hidden');
  dialogConfirm.focus();
}
function hideAlert() {
  alert.classList.add('hidden');
}
function showAlert(msg) {
  alertMsg.textContent = msg;
  alert.classList.remove('hidden');
  setTimeout(() => {
    hideAlert();
  }, 4000);
}
// this is for manual channel add, this logic isn't done yet
// function appendFirst(parent, el) {
//   if (parent.firstChild) {
//   parent.insertBefore(el, parent.firstChild);
// } else {
//   parent.appendChild(el);
// }
// }
// this is for initial list load
function appendLast(parent, el) {
  parent.appendChild(el);
}

/** ** EVENT BINDING BELOW ****/
function bindNav() {
  $$('.nav-link').forEach((nav) => {
    nav.addEventListener('click', (e) => {
      e.preventDefault();
      EV.emit('nav-click', e);
    });
  });
}

add.addEventListener('click', (e) => {
  EV.emit('add-button-click', e);
});
body.addEventListener('keyup', (e) => {
  EV.emit('body-keypress', e);
});

addContent.addEventListener('transitionend', () => {
  addInput.focus();
  addInput.select();
});

add.addEventListener('transitionend', (e) => {
  if (e.pseudoElement.length === 0) {
    addBox.classList.toggle('shadowed');
  }
});

addInput.addEventListener('keyup', (e) => {
  EV.emit('add-input-keypress', e);
});

addBoxValidate.addEventListener('click', (e) => {
  EV.emit('add-validate-click', e);
});
// -----------> !!!!!!!! the actual logic should be in user-input to be consistent.. !!!!!!!!!!!!!
alertClose.addEventListener('click', hideAlert);
// -----------> !!!!!!!! the actual logic should be in user-input to be consistent.. !!!!!!!!!!!!!
dialogCancel.addEventListener('click', hideDialog);

dialogConfirm.addEventListener('click', () => {
  EV.emit('confirm-remove-click');
});

/* HANDLE RESPONSES TO APP LOGIC EVENTS BELOW */
function buildChannelDOM(chanData, appendFunc = appendLast) {
  const template = instantiateTemplate(streamTemplate, chanData);
  const image = chanData.image;
  const status = chanData.status;
  if (status === 'live') {
    $('.stream-status', template).classList.add('live');
    $('.stream-viewers', template).classList.add('live');
  }
  if (image) { $('.stream-image', template).style.backgroundImage = `url('${image}')`; }
  $('.channel-link', template).addEventListener('click', (e) => {
    e.preventDefault();
    EV.emit('chan-link-click', chanData.channel);
  });
  $('.remove', template).addEventListener('click', () => {
    EV.emit('remove-chan-click', chanData.channel);
  });
  if (!chanData.displayed) { template.classList.add('hidden'); }
  template.setAttribute('data-channel', chanData.channel);
  appendFunc(main, template);
  hideLoader();
  return template;
}

function removeChannelDOM(channel) {
  const node = $(`.stream[data-channel='${channel}']`);
  node.parentNode.removeChild(node);
  hideDialog();
}

function filterDOMList(list) {
  $$('main .stream').forEach((stream) => {
    const chanName = stream.getAttribute('data-channel');
    if (list.indexOf(chanName) === -1) { stream.classList.add('hidden'); } else { stream.classList.remove('hidden'); }
  });
}

function raiseDuplicateError(channel) {
  hideLoader();
  showAlert(`${channel} is already in your list !`);
}

function raise404Error(channel) {
  hideLoader();
  showAlert(`${channel} does not exist.`);
}

function raiseGenericError() {
  hideLoader();
  showAlert('Oops. Unable to contact Twitch, check your internet connexion or try again later.');
}

export function init() {
  bindNav();

  EV.on('view-add', buildChannelDOM); // should add a channel to the dom
  EV.on('view-remove', removeChannelDOM); // should remove a channel from the dom
  EV.on('view-filter', filterDOMList); // should adjust "visibility" of a channel
  EV.on('view-duplicate', raiseDuplicateError);  // should handle channel already in list
  EV.on('view-404', raise404Error); // should handle channel not found
  EV.on('view-error', raiseGenericError); // should handle generic / network errors
  EV.on('view-show-loader', showLoader); // should pop loader
  EV.on('view-show-dialog', showDialog); // should pop dialog
  EV.on('view-hide-alert', hideAlert); // should hide alert
  EV.on('view-hide-dialog', hideDialog); // should hide dialog
}
