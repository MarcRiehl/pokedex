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
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentIndex}`);
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

function morePokemonData() {
    let resultRef = document.getElementById("content");
    resultRef.innerHTML = "";
    fetchDetailDataJson();

}

function renderThumb() {
    let resultRef = document.getElementById("content");
    for (let i = 0; i < dataArrayPokemon.length; i++) {
        let colorType = getColorOfType(dataArrayPokemon[i].types[0].type.name); //noch verbessern
        // console.log(dataArrayPokemon[i].types);
        resultRef.innerHTML += getHTMLForThumbs(i, colorType);
        currentIndex = i + 1;
    }
    
}

function getError() {
    let resultRef = document.getElementById("content");
    resultRef.innerHTML = "Fehler";
}

function getColorOfType(type) {
    switch (type) {
        case "normal":
            return "#A8A77A";
        case "fire":
            return "#EE8130";
        case "water":
            return "#6390F0";
        case "electric":
            return "#F7D02C";
        case "grass":
            return "#7AC74C";
        case "ice":
            return "#96D9D6";
        case "fighting":
            return "#C22E28";
        case "poison":
            return "#A33EA1";
        case "ground":
            return "#E2BF65";
        case "flying":
            return "#A98FF3";
        case "psychic":
            return "#F95587";
        case "bug":
            return "#A6B91A";
        case "rock":
            return "#B6A136";
        case "ghost":
            return "#735797";
        case "dragon":
            return "#6F35FC";
        case "dark":
            return "#705746";
        case "steel":
            return "#B7B7CE";
        case "fairy":
            return "#D685AD";
        default:
            return "#A8A77A";
    }
}