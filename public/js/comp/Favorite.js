import API from "../data/api.js";
import {showFavorite, deleteTeam, example} from "../data/db.js";

const Favorit = () => {
    // console.log("this is Favorit");
    function renderClubItems() {
        showFavorite().then(teams => {    
            var club = ''
            // console.log(teams);
            for (let index = 0; index < teams.length; index++) {
                const element = teams[index];
                club += `
                    <div class="col s12 m3">
                        <div class="card" >
                            <div class="card-image" style="height:281px; padding: 10px;">
                                <img src="${element.crestUrl}" width="50px">
                            </div>
                            <div class="card-content" style="height:100px">
                                <span class="card-title">${element.name}</span>
                            </div>
                            <div class="card-stacked">
                                <div class="card-action pink darken-4">
                                    <a href="info.html?id=${element.id}#info">More Info</a>
                                    <a href="index.html?delete=${element.id}#favorit">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }

            document.getElementById("club-items").innerHTML = club;

        }).catch(err => {
            console.error(err);
        });
    }

    function cekDelete() {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("delete");
        if (idParam) {
            deleteTeam(idParam);
        }else{
            console.log("tidak ada");
        }
    }
    
    cekDelete();
    renderClubItems();
}

export default Favorit;