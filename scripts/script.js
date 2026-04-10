
const dataArrayPokemon = [];
let dataSearchArrayPokemon = [];
let currentIndex = 0;
let currentArrayIndex = currentIndex;
let currentSearchArrayIndex = 0;
let dialogOpen = document.getElementById('dialog-frame');
const overlay = document.getElementById('overlay');
let resultRef = document.getElementById("content");
document.getElementById("year").innerHTML = new Date().getFullYear();


function init() {
    startLoadingScreen();
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
        currentIndex == 20 ? renderThumb() : startLoadingScreen(startIndex);
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
    resetView();

    for (let i = 0; i < dataArrayPokemon.length; i++) {
        let types = "";
        let colorType = "";
        for (let j = 0; j < dataArrayPokemon[i].types.length; j++) {
            let typeName = dataArrayPokemon[i].types[j].type.name;
            let color = getColorOfType(typeName);
            colorType = getColorOfType(dataArrayPokemon[i].types[0].type.name);
            types += `<span style="color:${color}"> ${typeName}</span>`;
        }
        resultRef.innerHTML += getHTMLForThumbs(i, colorType, types);
    }
}

function resetView() {
    dataSearchArrayPokemon = [];
    resultRef.innerHTML = "";
    document.getElementById("load-more").classList.remove("d-none");
    document.getElementById("loaded-all").classList.add("d-none");
    document.getElementById("search-pokemon").value = "";
}


function renderMoreThumb(startIndex) {
    for (let i = startIndex; i < dataArrayPokemon.length; i++) {
        let types = "";
        let colorType = "";
        for (let j = 0; j < dataArrayPokemon[i].types.length; j++) {
            let typeName = dataArrayPokemon[i].types[j].type.name;
            let color = getColorOfType(typeName);
            colorType = getColorOfType(dataArrayPokemon[i].types[0].type.name);
            types += `<span style="color:${color}"> ${typeName}</span>`;
        }
        resultRef.innerHTML += getHTMLForThumbs(i, colorType, types);
    }
}

function renderSearchThumb() {
    resultRef.innerHTML = "";
    for (let i = 0; i < dataSearchArrayPokemon.length; i++) {
        let types = "";
        let colorType = "";
        for (let j = 0; j < dataSearchArrayPokemon[i].types.length; j++) {
            let typeName = dataSearchArrayPokemon[i].types[j].type.name;
            let color = getColorOfType(typeName);
            colorType = getColorOfType(dataSearchArrayPokemon[i].types[0].type.name);
            types += `<span style="color:${color}"> ${typeName}</span>`;
        }
        resultRef.innerHTML += getHTMLForSearchThumbs(i, colorType, types);
    }
}

function getError() {
    document.getElementById("load-more").classList.add("d-none");
    resultRef.innerHTML = getHtmlForError();
}

function openPicture(index, colorType) {
    currentArrayIndex = index;
    dialogOpen.showModal();
    dialogOpen.classList.add('opened');
    srcInnerDialog(currentArrayIndex, colorType);
}

function openSearchPicture(index, colorType) {
    currentSearchArrayIndex = index;
    dialogOpen.showModal();
    dialogOpen.classList.add('opened');
    srcInnerDialog(currentSearchArrayIndex, colorType);
}

function dialogClose() {
    dialogOpen.close();
    dialogOpen.classList.remove('opened');
}

function srcInnerDialog(index) {
    let resultRef = document.getElementById("dialog-frame");
    let types = "";
    let colorType = "";
    let passOnArray = dataSearchArrayPokemon.length > 0 ? dataSearchArrayPokemon : dataArrayPokemon;
    for (let j = 0; j < passOnArray[index].types.length; j++) {
        let typeName = passOnArray[index].types[j].type.name;
        let color = getColorOfType(typeName);
        colorType = getColorOfType(passOnArray[index].types[0].type.name);
        types += `<span style="color:${color}"> ${typeName}</span>`;
    }
    if (passOnArray == dataArrayPokemon) {
        resultRef.innerHTML = getHtmlForDetail(index, types, colorType);
    } else {
        resultRef.innerHTML = getHtmlSearchForDetail(index, types, colorType);
    }
}

function nextPicture() {
    if (dataSearchArrayPokemon.length > 0) {
        if (currentSearchArrayIndex === dataSearchArrayPokemon.length - 1) {
            currentSearchArrayIndex = 0;
        } else {
            currentSearchArrayIndex++;
        }
        srcInnerDialog(currentSearchArrayIndex);
    } else {
        if (currentArrayIndex === dataArrayPokemon.length - 1) {
            currentArrayIndex = 0;
        } else {
            currentArrayIndex++;
        }
        srcInnerDialog(currentArrayIndex);
    }
}

function prevPicture() {
    if (dataSearchArrayPokemon.length > 0) {
        if (currentSearchArrayIndex === 0) {
            currentSearchArrayIndex = dataSearchArrayPokemon.length - 1;
        } else {
            currentSearchArrayIndex--;
        }
        srcInnerDialog(currentSearchArrayIndex);
    } else {
        if (currentArrayIndex === 0) {
            currentArrayIndex = dataArrayPokemon.length - 1;
        } else {
            currentArrayIndex--;
        }
        srcInnerDialog(currentArrayIndex);
    }
}

function searchPokemon() {
    document.getElementById("load-more").classList.add("d-none");
    document.getElementById("loaded-all").classList.remove("d-none");
    let resultInputField = document.getElementById("search-pokemon");
    let inputField = resultInputField.value.toLowerCase().trim();
    if (!checkInputField(inputField)) {
        return;
    }
    let results = dataArrayPokemon.filter(element =>
        element.name.toLowerCase().includes(inputField)
    );
    if (results.length === 0) {
        resultRef.innerHTML = getHtmlNoType();
        return;
    } else {
        dataSearchArrayPokemon = results;
    }
    renderSearchThumb();
}

function checkInputField(inputField) {
    if (inputField.length < 3) {
        resultRef.innerHTML = getHtmlMinSearchText();
        return false;
    }
    return true;
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}