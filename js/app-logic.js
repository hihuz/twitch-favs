/*jshint esversion:6 */
/*
  - On App Init, publishes all data from localStorage data or default list as needed
  - Calls the remote API when necessary (init, add new item, ..)
  - Listens to events from user-input module
  - Updates the store accordingly (new items, duplicates..)
  - Forwards changes to the remote db (local storage in this case)
  - Publishes events when store is updated (for the view to listen to)
  - 100% independent from the DOM/View
  - store object should only be accessed with privileged methods but isn't actually private for convenience, this would be updated

  Roadmap :
  - manual channel adds should be first in list maybe ?
  - add a placeholder for empty lists maybe ?
  - add a "list sort" interface + view, this would imply a different menu most likely
*/

//TODO : encapsulate the "store" so that it can only be accessed through its interface
//TODO (maybe) : change it so that the actual remote API AND ajax library are abstracted from here
//TODO (maybe) : see where the best place is for pushToDb()

const AppLogic = (function() {
  const ajax = Utility.ajax;
  const store = {
    list: [],
    data: Object.create(null),

    set: function(channel, value) {
      if (!(channel in this.data)) {
        this.list.push(channel);
        this.data[channel] = value;
      }
      else {
        throw new Error('setting a channel that is already in the list');
      }
    },
    setProp: function(channel, prop, value) {
      if (channel in this.data) {
        this.data[channel][prop] = value;
      }
      else {
        throw new Error('setting a property for a channel that is NOT in the list');
      }
    },
    //this will be used to check for duplicates
    //should provide public API for this (tests)
    get: function(channel) {
      return this.data[channel];
    },
    getList: function() {
      return this.list;
    },
    remove: function(channel) {
      const index = this.list.indexOf(channel);
      if (index > -1) {
        this.list.splice(index, 1);
        delete this.data[channel];
        return channel;
      }
      else {
        throw new Error('removing a channel that is NOT in  the list');
      }
    }
  };

  //pushes a list to remote db (in this case localStorage)
  function pushToDb(list) {
    if (localStorage) {
      localStorage.setItem("streams",JSON.stringify(list));
    }
    else {
      console.log("Oops, no local storage, you will get the default list next time.");
    }
  }

  function initialDbFetch() {
    const dbList = localStorage.getItem("streams");
    let list;
    if (dbList) {
      list = JSON.parse(dbList);
    }
    else {
      //savjz, hsdogdog, kolento, strifecro are among my favorite hearthstone streamers :>
      list = ["savjz", "freecodecamp", "esl_sc2", "faceittv", "milleniumtv", "hsdogdog", "kolento", "strifecro"];
    }
    return list;
  }

  //takes a channel name and a callback
  //calls the streams api to gather live stream data if online
  //!!This is better than the other way around coz there is no way to know if a channel is online from the channel api!!
  //if channel does not exist : callback with 404 status
  function  gatherStreamData(stream, cb) {
    if (stream) { stream = stream.toLowerCase(); }
    const url = "https://api.twitch.tv/kraken/streams/" + stream;
    let results;
    superagent.get(url)
    .set("Client-ID", "i9ngqvifr89bi64sfe95ayy2u2xs5q1")
    .end(function (err, resp) {
      if (err || !resp.ok) {
        //handle network / generic err
        //stream doesn't exist, 404
        if (resp.status == 404) {
          results = {
            channel: stream,
            status: "404"
          };
          return cb(results);
        }
      }
      //resp.body.stream means stream is online
      else if (resp.body.stream) {
        const data = resp.body.stream;
        results = {
          displayed: true,
          channel: stream,
          name: data.channel.display_name,
          title: data.channel.status,
          game: data.game,
          image: data.preview.medium,
          viewers: data.viewers,
          statusText: "Live:",
          status: "live"
        };
        return cb(results);
      }
      //stream is offline, do a call to the channel API in this case
      else {
        gatherChannelData(stream, cb);
      }
    });
  }

  //takes a channel name and a callback
  //this is called everytime a channel in the list is offline so we can at least get channel data to display
  function gatherChannelData(channel, cb) {
    if (channel) { channel = channel.toLowerCase(); }
    const url = "https://api.twitch.tv/kraken/channels/" + channel;
    superagent.get(url)
    .set("Client-ID", "i9ngqvifr89bi64sfe95ayy2u2xs5q1")
    .end(function (err, resp) {
      if (err || !resp.ok) {
        //handle network / generic err
      }
      else {
        const data = resp.body;
        const results = {
          displayed: true,
          channel: channel,
          name: data.display_name,
          title: " ",
          statusText: "Offline",
          status: "offline",
          game: " ",
          image: data.logo
        };
        return cb(results);
      }
    });
  }

  //wraps a promise around the function doing ajax calls
  function promiseStreamData(stream) {
    return new Promise(function(resolve, err){
      gatherStreamData(stream, resolve);
    });
  }
  //takes an array of channel names and a callback
  //calls the promise wrapper for each one, forwarding the callback
  //API calls are wrapped in a promise to ease resolving order - items should appear in order
  //mostly this is because an upgrade I want to do is the ability to sort the list of channels
  function fullDataGather(list, cb) {
    list
    .map(promiseStreamData)
    .reduce(function(chain, streamPromise) {
      return chain
      .then(function(){
        return streamPromise;
      })
      .then(cb);
    }, Promise.resolve()); //init promise chain
  }

  //if data, means channel is already in the store
  //forward duplicate info to view, or gather data accordingly
  function addChannel(channel) {
    if (channel) { channel = channel.toLowerCase(); }
    const data = store.get(channel);
    if (data) {
      EV.emit("view-duplicate", data.name);
    } else {
      gatherStreamData(channel, pushToStore);
    }
  }

  function removeChannel(channel) {
    const removed = store.remove(channel);
    pushToDb(store.getList());
    if (removed) { EV.emit("view-remove", channel); }
  }

  function getFilteredList(filter, list) {
    const filteredList = list.filter(function(channel) {
      const chanData = store.get(channel);
      return chanData.status == filter || filter == "all";
    });
    return filteredList;
  }

  function filterList(filter) {
    console.log(filter);
    const fullList = store.getList();
    const filteredList = getFilteredList(filter, fullList);
    fullList.forEach(function(channel) {
      const displayed = filteredList.indexOf(channel)!=-1;
      store.setProp(channel, "displayed", displayed);
    });
    EV.emit("view-filter", filteredList);
  }

  //simply stores a new entry and notifies the view
  //or notifies the view for a 404
  function pushToStore(data) {
    if (data.status == "404") {
      EV.emit("view-404", data.channel);
    }
    else {
      store.set(data.channel, data);
      pushToDb(store.getList());
      EV.emit("view-add", data);
    }
  }

  function init() {
    //on app init, build initial list of streams
    const list = initialDbFetch();
    fullDataGather(list, pushToStore);

    EV.on("app-logic-add", addChannel);
    EV.on("app-logic-remove", removeChannel);
    EV.on("app-logic-filter", filterList);

    EV.on("show-store", function() {
      console.log(store);
    });
  }

  EV.on("init",init);

})();