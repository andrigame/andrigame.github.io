import API from "../data/api.js";
import {addFavoritTeam, example} from "../data/db.js";

const Info = () => {
    console.log("this is Info");
    const urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    function renderClubItems() {
        API.getInfo(idParam).then(result => {
            const club = `
                <div class="card-image center-align" style="padding-top: 20px; " >
                    <img src="${result.crestUrl}" height="200px">
                </div>
                <div class="card-content">
                    <span class="card-title pink-text text-darken-4"><b>${result.name}</b></span>
                    <table>
                        <tbody>
                            <tr>
                                <td>Short Name</td>
                                <td>: ${result.shortName}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>: ${result.address}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>: ${result.phone}</td>
                            </tr>
                            <tr>
                                <td>Website</td>
                                <td>: ${result.website}</td>
                            </tr>
                            <tr>
                                <td>Club Colors</td>
                                <td>: ${result.clubColors}</td>
                            </tr>
                            <tr>
                                <td>Venue</td>
                                <td>: ${result.venue}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;

            let squad = '';
            const squads = result.squad;
            for (let index = 0; index < squads.length; index++) {
                const element = squads[index];
                squad += `
                    <tr>
                        
                        <td>${element.name}</td>
                        <td>${element.position}</td>
                        <td class="hidden">${element.nationality}</td>
                        <td class="hidden">${element.role}</td>
                    </tr>
                `
            }

            document.getElementById("info-box").innerHTML = club;
            document.getElementById("player").innerHTML = squad;

        }).catch(err => {
            console.error(err);
        });
    }
    renderClubItems();

    const save = document.getElementById('save');
    save.addEventListener('click', () => {
        addFavoritTeam();
    });
    
}

export default Info;