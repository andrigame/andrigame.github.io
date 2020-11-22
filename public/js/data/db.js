import API from "../data/api.js";

var dbPromised = idb.open("liga-inggris", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("shortName", "shortName", { unique: false });
});

export function addFavoritTeam(){
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    API.getInfo(idParam).then(result => {
        dbPromised
        .then(function(db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(result);
            store.put(result);
            return tx.complete;
        })
        .then(function() {
            console.log("Team berhasil di simpan.");
        });
    }).catch(err => {
        console.error(err);
    });
}

export function showFavorite() {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const transaction = db.transaction("teams", `readonly`);
            return transaction.objectStore("teams").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    })
}

export function deleteTeam(idTeam) {
    // console.log(idParam);
    let a = parseInt(idTeam);
    dbPromised.then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var team = tx.objectStore('teams');
        team.delete(a);
        return tx.complete;
    }).then(function() {
        window.location.href="index.html#favorit";
    });
};

export function example(){
    console.log("example");
}

// document.addEventListener('DOMContentLoaded', function() {
//     var save = document.querySelector('#save');
//     save.onclick = function() {
//         addFavoritTeam();
//     }
// })
