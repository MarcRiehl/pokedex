// function filter per name min. 3 char
// function spinner beim laden von +20 Pokemons

const dataArrayPokemon = [];
let dataSearchArrayPokemon = [];
let currentIndex = 0;
let currentArrayIndex = currentIndex;
let currentSearchArrayIndex = 0;
let dialogOpen = document.getElementById('dialog-frame');
const overlay = document.getElementById('overlay');


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
        let startIndex = currentIndex;
        let getFetchData = await fetchDataJson();
        let getFetchDataNew = getFetchData.results.length + currentIndex;
        for (let index = currentIndex; index < getFetchDataNew; index++) {
            currentIndex++;
            let newDetailFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentIndex}/`);
            let responseDetailAsJson = await newDetailFetch.json();
            dataArrayPokemon.push(responseDetailAsJson);
        }
        if (currentIndex == 20) {
            renderThumb();
        } else {
            startLoadingScreen(startIndex);
        }
    } catch (error) {
        getError();
    }

}

function startLoadingScreen(startIndex) {
    overlay.classList.add("overlay");
    overlay.classList.remove("hidden");
    document.body.classList.add("no-scroll");
    setTimeout(() => {
        renderMoreThumb(startIndex);
        endLoadingScreen();
    }, 3000);
}

function endLoadingScreen() {
    overlay.classList.remove("overlay");
    overlay.classList.add("hidden");
    document.body.classList.remove("no-scroll");
}


function morePokemonData() {
    fetchDetailDataJson();
}

function renderThumb() {
    let resultRef = document.getElementById("content");
    for (let i = 0; i < dataArrayPokemon.length; i++) {
        let types = "";
        let colorType = "";
        for (let j = 0; j < dataArrayPokemon[i].types.length; j++) {
            let typeName = dataArrayPokemon[i].types[j].type.name;
            let color = getColorOfType(typeName);
            colorType = getColorOfType(dataArrayPokemon[i].types[0].type.name); //noch verbessern;
            types += `<span style="color:${color}"> ${typeName}</span>`;
        }
        resultRef.innerHTML += getHTMLForThumbs(i, colorType, types);
    }
}

function renderColorTypes(i){

}


function renderMoreThumb(startIndex) {
    let resultRef = document.getElementById("content");
    for (let i = startIndex; i < dataArrayPokemon.length; i++) {
        let types = "";
        let colorType = "";
        for (let j = 0; j < dataArrayPokemon[i].types.length; j++) {
            let typeName = dataArrayPokemon[i].types[j].type.name;
            let color = getColorOfType(typeName);
            colorType = getColorOfType(dataArrayPokemon[i].types[0].type.name); //noch verbessern;
            types += `<span style="color:${color}"> ${typeName}</span>`;
        }
        resultRef.innerHTML += getHTMLForThumbs(i, colorType, types);
    }
}

function renderSearchThumb() {
    let resultRef = document.getElementById("content");
    resultRef.innerHTML = "";
      for (let i = 0; i < dataSearchArrayPokemon.length; i++) {
        let types = "";
        let colorType = "";
        for (let j = 0; j < dataSearchArrayPokemon[i].types.length; j++) {
            let typeName = dataSearchArrayPokemon[i].types[j].type.name;
            let color = getColorOfType(typeName);
            colorType = getColorOfType(dataSearchArrayPokemon[i].types[0].type.name); //noch verbessern;
            types += `<span style="color:${color}"> ${typeName}</span>`;
        }
        resultRef.innerHTML += getHTMLForSearchThumbs(i, colorType, types);
    }
}

function getError() {
    let resultRef = document.getElementById("content");
    resultRef.innerHTML = "Fehler";
}

function openPicture(index, colorType) {
    currentArrayIndex = index; //neu deklarieren für nextPicture()
    dialogOpen.showModal();
    dialogOpen.classList.add('opened');
    srcInnerDialog(currentArrayIndex, colorType);
}

function openSearchPicture(index, colorType) {
    currentSearchArrayIndex = index; //neu deklarieren für nextPicture()
    dialogOpen.showModal();
    dialogOpen.classList.add('opened');
    srcInnerSearchDialog(currentSearchArrayIndex, colorType);
}


function dialogClose() {
    dialogOpen.close();
    dialogOpen.classList.remove('opened');
}

function srcInnerDialog(index) {
    let resultRef = document.getElementById("dialog-frame");
        let types = "";
        let colorType = "";
        for (let j = 0; j < dataArrayPokemon[index].types.length; j++) {
            let typeName = dataArrayPokemon[index].types[j].type.name;
            let color = getColorOfType(typeName);
            colorType = getColorOfType(dataArrayPokemon[index].types[0].type.name); //noch verbessern;
            types += `<span style="color:${color}"> ${typeName}</span>`;
        }
    resultRef.innerHTML = getHtmlForDetail(index, types, colorType);
}

function srcInnerSearchDialog(index) {
    let resultRef = document.getElementById("dialog-frame");
        let types = "";
        let colorType = "";
        for (let j = 0; j < dataSearchArrayPokemon[index].types.length; j++) {
            let typeName = dataSearchArrayPokemon[index].types[j].type.name;
            let color = getColorOfType(typeName);
            colorType = getColorOfType(dataSearchArrayPokemon[index].types[0].type.name); //noch verbessern;
            types += `<span style="color:${color}"> ${typeName}</span>`;
        }
    resultRef.innerHTML = getHtmlSearchForDetail(index, types, colorType);
}

function nextPicture() {
    if (currentArrayIndex === dataArrayPokemon.length - 1) {
        currentArrayIndex = 0;
    } else {
        currentArrayIndex++;
    }
    srcInnerDialog(currentArrayIndex);
}

function prevPicture() {
    if (currentArrayIndex === 0) {
        currentArrayIndex = dataArrayPokemon.length - 1;
    } else {
        currentArrayIndex--;
    }
    srcInnerDialog(currentArrayIndex);
}

function nextSearchPicture() {
    if (currentSearchArrayIndex === dataSearchArrayPokemon.length - 1) {
        currentSearchArrayIndex = 0;
    } else {
        currentSearchArrayIndex++;
    }
    srcInnerSearchDialog(currentSearchArrayIndex);
}

function prevSearchPicture() {
    if (currentSearchArrayIndex=== 0) {
        currentSearchArrayIndex = dataSearchArrayPokemon.length - 1;
    } else {
        currentSearchArrayIndex--;
    }
    srcInnerSearchDialog(currentSearchArrayIndex);
}

function searchPokemon() {
    document.getElementById("load-more").classList.add("d-none");
    let resultInputField = document.getElementById("search-pokemon");
    let inputField = resultInputField.value.toLowerCase().trim();
    if (inputField.length < 3) {
        console.log("Mindestens 3 Buchstaben eingeben");
        return;
    }
    let results = dataArrayPokemon.filter(element =>
        element.name.toLowerCase().includes(inputField)
    );

    //  console.log(results);
    if (results == 0) {
        console.log("Kein Type gefunden")
    } else {
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