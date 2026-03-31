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
    getListOfPokemons();
    
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

async function getListOfPokemons() {
    let getFetchData = await fetchDataJson();
    for (let index = 0; index < getFetchData.results.length; index++) {
        dataArrayPokemon.push(
            {
            name: getFetchData.results[index].name,
            url: getFetchData.results[index].url
            }
        )  
    }
     renderThumb();
}

function renderThumb(){
    let resultRef = document.getElementById("content");
    for (let i = 0; i < dataArrayPokemon.length; i++) {
       resultRef.innerHTML += getHTMLForThumbs(i);
    }

}

function getError() {
    let resultRef = document.getElementById("content");
    resultRef.innerHTML = "Fehler";
}


