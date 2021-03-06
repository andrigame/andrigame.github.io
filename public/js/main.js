import Home from "./comp/home.js";
import Klasmen from "./comp/klasmen.js";
import Info from "./comp/info.js";
import Favorit from "./comp/Favorite.js";

document.addEventListener("DOMContentLoaded", function() {
    // Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    
    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;
        
                    // Muat daftar tautan menu
                    document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                
                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "navigasi.html", true);
        xhttp.send();
    }

    // Load page content
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    console.log(page);
    if (page == "info") {
        Info();
    }else{
        loadPage(page);
    }
    
    function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            var content = document.querySelector(".body-content");
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
                switch(page){
                    case 'home':
                        Home();
                        break;
                    case 'klasmen':
                        Klasmen();
                        break;
                    case 'favorit':
                        Favorit();
                        break;                    
                }
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", `halaman/${page}.html`, true);
    xhttp.send();
    }

});