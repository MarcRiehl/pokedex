// function alle Pokemon auslesen immer += 20
// function in array push ausgelesene Pokemonts
// function array push detail ausgelesene Pokemonts??
// function list pokemon = 20 
// function onclick detail pokemon in Dialog
// function next previous Pokemon
// function filter per name min. 3 char
// function load more
// function spinner beim laden von +20 Pokemons

const dataArrayPokemon = [];
let currentIndex = 0;

function ini() {
    fetchDetailDataJson();
}

async function fetchDataJson() {
    try {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        let responseAsJson = await response.json();
        return responseAsJson;
    } catch (error) {
        getError();
    }

}

async function fetchDetailDataJson() {
    try {
        let getFetchData = await fetchDataJson();       
        for (let index = 0; index < getFetchData.results.length; index++) {
            let id = index + 1;
            let newDetailFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            let responseDetailAsJson = await newDetailFetch.json();
            dataArrayPokemon.push(responseDetailAsJson);
            // dataArrayPokemon.push(
            //     {
            //         name: getFetchData.results[index].name,
            //         url: getFetchData.results[index].url
            //     }
            // )
        }
        renderThumb();
        // return dataArrayPokemon;
    } catch (error) {
        getError();
    }

}

function renderThumb() {
    let resultRef = document.getElementById("content");
    for (let i = 0; i < dataArrayPokemon.length; i++) {
        // console.log(dataArrayPokemon[i].types);
        resultRef.innerHTML += getHTMLForThumbs(i);
    }

}

function getColorOfType(types){
switch (types){
    case "grass":
        return "#12541";
    default:
        return "#12541";   
}
}

function getError() {
    let resultRef = document.getElementById("content");
    resultRef.innerHTML = "Fehler";
}

function getColor(type){
    switch (type) {
        case "grass":
            return "green";
        case "fire":
            return "red";
        case "water":
            return "blue";
        default:
            return "gray";
    }
}