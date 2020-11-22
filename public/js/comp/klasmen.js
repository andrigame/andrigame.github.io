import API from "../data/api.js";

const Klasmen = () => {
    function renderKlasmen() {
        API.getKlasmen().then(standings => {    
            var row = ''
            // console.log(standings[0].table);
            const table = standings[0].table;
            for (let index = 0; index < table.length; index++) {
                const element = table[index];
                let color = '';
                if (element.position <= 4) {
                    color = "blue darken-4";
                }else if(element.position == 5){
                    color = "orange";
                }else if(element.position >= 18){
                    color = "red darken-4";
                }
                row += `
                    <tr>
                        <td class="${color}">${element.position}</td>
                        <td width="40"> <img class="hidden" src="${element.team['crestUrl']}" height="40"></td>
                        <td>${element.team['name']}</td>
                        <td>${element.playedGames}</td>
                        <td class="hidden">${element.won}</td>
                        <td class="hidden">${element.draw}</td>
                        <td class="hidden">${element.lost}</td>
                        <td class="hidden">${element.goalsFor}</td>
                        <td class="hidden">${element.goalsAgainst}</td>
                        <td>${element.goalDifference}</td>
                        <td>${element.points}</td>
                    </tr>
                `
            }

            document.getElementById("klasmen").innerHTML = row;

        }).catch(err => {
            console.error(err);
        });
    }
    renderKlasmen();
}

export default Klasmen;