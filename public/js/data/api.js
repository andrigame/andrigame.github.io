const apiKey = "6738fb8a2d9e48899a0f87316cd534d0";
const baseUrl = "https://api.football-data.org/v2/";
let requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: new Headers()
};
requestOptions.headers.append('accept', '*/*');
requestOptions.headers.append('X-Auth-Token', apiKey);


class API {

    static getClubs(){
        const uri = new URL(`competitions/PL/teams?season=2020`, baseUrl);
        const request = new Request(uri, requestOptions);
        return fetch(request).then(result => result.json())
        .then(result => {
            if(result){
                return Promise.resolve(result.teams);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch(err => {
            console.error(err);
            return Promise.reject();
        })
    };

    static getKlasmen(){
        const uri = new URL(`competitions/PL/standings?standingType=TOTAL`, baseUrl);
        const request = new Request(uri, requestOptions);
        return fetch(request).then(result => result.json())
        .then(result => {
            if(result){
                return Promise.resolve(result.standings);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch(err => {
            console.error(err);
            return Promise.reject();
        })
    }

    static getInfo(id){
        const uri = new URL(`teams/${id}`, baseUrl);
        const request = new Request(uri, requestOptions);
        return fetch(request).then(result => result.json())
        .then(result => {
            if(result){
                return Promise.resolve(result);
            } else {
                return Promise.reject(`The request was made but no response was received`);
            }
        }).catch(err => {
            console.error(err);
            return Promise.reject();
        })
    }
}

export default API;