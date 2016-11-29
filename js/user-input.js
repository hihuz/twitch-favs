/*jshint esversion:6 */
/*
  - listens to view events
  - computes action logic based off event type and target
  - publishes app-logic friendly events
  - should have minimal knowledge of the dom, but will use the dom events as input
*/

//TODO : cleanup logic for dialog / alert to be consistent (either all here or all in view)

const UserInput = (function() {
  const $ = Utility.$;
  const $$ = Utility.$$;
  const addButton = $(".add-button");
  const addBox = $(".add-box");
  const addInput = $(".add-box-input");
  let addBoxOpened = false;
  let contextChannel;

  function toggleAddBox() {
    addButton.classList.toggle("opened");
    addBox.classList.toggle("opened");
    addBoxOpened = !addBoxOpened;
  }

  function handleNavClick(e) {
    const item = e.target.parentNode;
    const cur = $(".nav-item-cur");
    const filter = e.target.getAttribute("data-filter");
    if (cur) { cur.classList.remove("nav-item-cur"); }
    item.classList.add("nav-item-cur");
    console.log(filter);
    EV.emit("app-logic-filter", filter);
  }

  function handleLinkClick(channel) {
    const url = "https://www.twitch.tv/" + channel;
    window.open(url);
  }

  function handleRemoveClick(channel) {
    contextChannel = channel;
    const msg = "Remove " + channel + " from your list?";
    EV.emit("view-show-dialog", msg);
  }

  function handleConfirmRemoveClick() {
    EV.emit("app-logic-remove", contextChannel);
  }

  function handleAddButtonClick(e) {
    toggleAddBox();
  }

  function handleBodyKeypress(e) {
    if (e.keyCode == "27") {
      EV.emit("view-hide-alert");
      EV.emit("view-hide-dialog");
      if (addBoxOpened) {
        toggleAddBox();
      }
    }
  }

  //enter key when search input has focus should behave as validate click.
  function handleAddInputKeypress(e) {
    if (e.keyCode == "13") {
      handleAddValidateClick(e);
    }
  }

  function handleAddValidateClick(e) {
    if (addInput.value.length > 0) {
      toggleAddBox();
      let searchValue = encodeURI(addInput.value);
      EV.emit("view-show-loader");
      EV.emit("app-logic-add", searchValue);
    }
  }

  function init() {
    EV.on("nav-click", handleNavClick);
    EV.on("chan-link-click", handleLinkClick);
    EV.on("remove-chan-click", handleRemoveClick);
    EV.on("confirm-remove-click", handleConfirmRemoveClick);
    EV.on("add-button-click", handleAddButtonClick);
    EV.on("body-keypress", handleBodyKeypress);
    EV.on("add-input-keypress", handleAddInputKeypress);
    EV.on("add-validate-click", handleAddValidateClick);
  }

  EV.on("init",init);
})();