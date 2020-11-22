import API from "../data/api.js";

const Home = () => {
    // console.log("this is home");
    function renderClubItems() {
        API.getClubs().then(teams => {    
            var club = ''
            // console.log(teams);
            for (let index = 0; index < teams.length; index++) {
                const element = teams[index];
                club += `
                    <div class="col s12 m3">
                        <div class="card" >
                            <div class="card-image" style="height:281px; padding: 10px;">
                                <img src="${element.crestUrl}" alt="${element.crustUrl}" width="50px" >
                            </div>
                            <div class="card-content" style="height:100px">
                                <span class="card-title">${element.name}</span>
                            </div>
                            <div class="card-stacked">
                                <div class="card-action pink darken-4">
                                    <a href="info.html?id=${element.id}#info">More Info</a>
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
    renderClubItems();
}

export default Home;