// function filter per name min. 3 char
// function spinner beim laden von +20 Pokemons

const dataArrayPokemon = [];
let dataSearchArrayPokemon = [];
let currentIndex = 0;
let currentArrayIndex = currentIndex;
let dialogOpen = document.getElementById('dialog-frame');

function ini() {
    fetchDetailDataJson();
    searchPokemon();
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
        let startIndex = currentIndex;
        let getFetchData = await fetchDataJson();
        let getFetchDataNew = getFetchData.results.length + currentIndex;
        for (let index = currentIndex; index < getFetchDataNew; index++) {
            currentIndex++;
            let newDetailFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentIndex}/`);
            let responseDetailAsJson = await newDetailFetch.json();
            dataArrayPokemon.push(responseDetailAsJson);
            // dataArrayPokemon.push(
            //     {
            //         name: getFetchData.results[index].name,
            //         url: getFetchData.results[index].url
            //     }
            // )
        }
        if (currentIndex == 20) {
            renderThumb();
        } else {
            renderMoreThumb(startIndex);
        }
        // return dataArrayPokemon;
    } catch (error) {
        getError();
    }

}

function morePokemonData() {
    fetchDetailDataJson();

}

function renderThumb() {
    let resultRef = document.getElementById("content");
    for (let i = 0; i < dataArrayPokemon.length; i++) {
        let colorType = getColorOfType(dataArrayPokemon[i].types[0].type.name); //noch verbessern
        // console.log(dataArrayPokemon[i].types);
        resultRef.innerHTML += getHTMLForThumbs(i, colorType);
    }
}

function renderMoreThumb(startIndex) {
    let resultRef = document.getElementById("content");
    for (let i = startIndex; i < dataArrayPokemon.length; i++) {
        let colorType = getColorOfType(dataArrayPokemon[i].types[0].type.name); //noch verbessern;
        resultRef.innerHTML += getHTMLForThumbs(i, colorType);
    }
}

function renderSearchThumb() {
    let resultRef = document.getElementById("content");
    resultRef.innerHTML = "";
    for (let i = 0; i < dataSearchArrayPokemon.length; i++) {
        let colorType = getColorOfType(dataSearchArrayPokemon[i].types[0].type.name); //noch verbessern
    //    console.log(dataSearchArrayPokemon[i].types);
        resultRef.innerHTML += getHTMLForSearchThumbs(i, colorType);
    }
}

function getError() {
    let resultRef = document.getElementById("content");
    resultRef.innerHTML = "Fehler";
}

function openPicture(index) {
    currentArrayIndex = index; //neu deklarieren für nextPicture()
    dialogOpen.showModal();
    dialogOpen.classList.add('opened');
    srcInnerDialog(currentArrayIndex);
}

function dialogClose() {
    dialogOpen.close();
    dialogOpen.classList.remove('opened');
}

function srcInnerDialog(index) {
     let resultRef = document.getElementById("dialog-frame");
     resultRef.innerHTML = getHtmlForDetail(index);
}

function nextPicture() {
    if (currentArrayIndex === dataArrayPokemon.length - 1) {
        currentArrayIndex = 0;
    } else {
        currentArrayIndex ++;
    }
    srcInnerDialog(currentArrayIndex);
}

function prevPicture() {
    if (currentArrayIndex === 0) {
        currentArrayIndex = dataArrayPokemon.length - 1;
    } else {
        currentArrayIndex --;
    }
    srcInnerDialog(currentArrayIndex);
}

function searchPokemon(){
    let resultInputField = document.getElementById("search-pokemon");
    let inputField = resultInputField.value.toLowerCase().trim();
  

        if (inputField.length < 3) {
        console.log("Mindestens 3 Buchstaben eingeben");
        return;
    }
        let results = dataArrayPokemon.filter(elem =>
        elem.name.toLowerCase().includes(inputField) //returns true if a string contains a specified string.
    );

    //  console.log(results);
    if (results == 0){
        console.log("Kein Type gefunden")
    }else{
        dataSearchArrayPokemon = results;
        }
        renderSearchThumb();
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