function addfav() {
    if (!('indexedDB' in window)) {
        console.log('Tidak mendukung IndexedDB');
        return;
    }

    var dbPromise = idb.open("favteam", 1, function(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("team")) {
            upgradeDb.createObjectStore("team", {keyPath: 'id'});
        }
        console.log('Object store created!')
    });

    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    fetch(base_url + "teams/" + idParam, {
        headers : {
            'X-Auth-Token': "8e01521d33a942fd96c3c827ef85e6a4"
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            dbPromise.then(function (db) {
                if ('PushManager' in window) {
                    navigator.serviceWorker.getRegistration()
                        .then(function (reg) {
                            reg.showNotification(`Team ${data.name} added to your favourite list`);
                        });
                }

                var tx = db.transaction('team', 'readwrite');
                var store = tx.objectStore('team');
                var team = {
                    name: `${data.name}`
                };
                store.put(data);
                return tx.complete;
            }).then(function () {
                M.toast({html: 'disimpan ke favorit',classes: 'rounded'})
                console.log('Team successfully added');
            }).catch(function (error) {
                alert('Fail to add team :(');
                console.log('Team failed to added');
                console.log(error);
            });
        });
}