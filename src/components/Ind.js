(function () {
  // IndexedDB
  var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
    dbVersion = 2.0;

  // Create/open database
  var request = indexedDB.open("soundScapeFiles", dbVersion),
    db,
    createObjectStore = function (dataBase) {
      // Create an objectStore
      console.log("Creating objectStore")
      dataBase.createObjectStore("sounds");
    },

    getImageFile = function () {
      // Create XHR
      var xhr = new XMLHttpRequest(),
        blob;

      xhr.open("GET", "/media/big.mp3", true);
      // Set the responseType to blob
      xhr.responseType = "blob";

      xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
          console.log("Image retrieved");
          
          // Blob as response
          blob = xhr.response;
          console.log("Blob:" + blob);

          // Put the received blob into IndexedDB
          putElephantInDb(blob);
        }
      }, false);
      // Send XHR
      xhr.send();
    },

    putElephantInDb = function (blob) {
      console.log("Putting elephants in IndexedDB");

      // Open a transaction to the database
      var transaction = db.transaction(["sounds"], 'readwrite');

      // Put the blob into the dabase
      var put = transaction.objectStore("sounds").put(blob, "big");

      // Retrieve the file that was just stored
      transaction.objectStore("sounds").get("big").onsuccess = function (event) {
        var soundFile = event.target.result;
        console.log(soundFile);

        // Get window.URL object
        var URL = window.URL || window.webkitURL;

        // Create and revoke ObjectURL
        var soundURL = URL.createObjectURL(soundFile);

        // Set img src to ObjectURL
        setTimeout(() => {
          var sound = new Howl({
            src: [soundURL],
            format: 'mp3',
            sprite: { __default: [0, 20000, true] },
            volume: .9,
            onload() {
              setTimeout(() => { sound.play(); }, 500)
              URL.revokeObjectURL(soundURL);
            }
          })
        }, 3000)
      };
    };

  request.onerror = function (event) {
    console.log("Error creating/accessing IndexedDB database");
  };

  request.onsuccess = function (event) {
    console.log("Success creating/accessing IndexedDB database");
    db = request.result;

    db.onerror = function (event) {
      console.log("Error creating/accessing IndexedDB database");
    };
    
    getImageFile();
  }
  
  request.onupgradeneeded = function (event) {
    console.log('Creating store')
    createObjectStore(event.target.result);
  };
})()