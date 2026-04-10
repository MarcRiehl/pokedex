
function getHTMLForThumbs(i, colorType, types) {
    let pokemon = dataArrayPokemon[i];
    return `
    <div class="card" onclick="openPicture(${i})">
        <div class="list-thumb" style="background:${colorType}">
            <h2 class="h2-card-title">${pokemon.name} / id:${pokemon.id}</h2>
                <div class="list-thumb-img">
                    <div>
                        <img class="current-thumb-img" src="${pokemon.sprites.other['official-artwork'].front_default}">
                    </div>
                    <div class="background-types">
                    ${types}
                    </div>
                </div>
        </div>
    </div>
    `;
}

function getHTMLForSearchThumbs(i, colorType,types) {
    let pokemon = dataSearchArrayPokemon[i];
    return `
    <div class="card" onclick="openSearchPicture(${i})">
        <div class="list-thumb" style="background:${colorType}">
            <h2 class="h2-card-title">${pokemon.name} / id:${pokemon.id}</h2>
                <div class="list-thumb-img">
                    <div>
                        <img class="current-thumb-img" src="${pokemon.sprites.other['official-artwork'].front_default}">
                    </div>
                    <div class="background-types">
                    ${types}
                    </div>
                </div>
        </div>  
    </div>
    `;
}


function getHtmlForDetail(i, types, colorType) {
    let pokemon = dataArrayPokemon[i];  
    return `
    <div class="dialog-frame-open">
        <div class="dialog-header" style="background: ${colorType}; position: relative;">
            <div id="dialog-picture-control">
                <div>
                    <button id="previous-picture" onclick="prevPicture(${i})"><span class="previous-picture"></span>
                    </button>
                    <button id="next-picture" onclick="nextPicture(${i})"><span class="next-picture"></span>
                    </button>
                </div>
                <div>
                    <button aria-label="Dialog schliessen" id="dialog-close" onclick="dialogClose()"
                    aria-controls="dialog-frame"><span class="close-button"></span>
                    </button>
                </div>
            </div>
            <div class="dialog-headline">
                <div class="dialog-name">
                    <h2 class="dialog-title">${pokemon.name}</h2>
                    <div class="background-types">
                        ${types}
                    </div>
                </div>
                <h2 class="dialog-title">id:${pokemon.id}</h2>
            </div>
            <div class="current-detail">
                <img class="current-detail-img" src="${pokemon.sprites.other['official-artwork'].front_default}">
            </div>
        </div>
        <div id="dialog-content">
            <div class="wrapper-tab">
                <div class="tabs">
                    <div class="tab">
                        <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch">
                        <label for="tab-1" class="tab-label">About</label>
                        <div class="tab-content">
                            <table class="pokemon-table">
                                <tr>
                                    <td>
                                        Height:
                                    </td>
                                    <td>
                                        ${pokemon.height} dm / ${(pokemon.height * 10).toFixed(1)} cm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Weight:
                                    </td>
                                    <td>
                                        ${pokemon.weight} hg / ${(pokemon.weight / 10).toFixed(1)} kg
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Abilities:
                                    </td>
                                    <td>
                                        ${pokemon.abilities.map(index => `${index.ability.name}`).join(" / ")}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Base-Exp.:
                                    </td>
                                    <td>
                                        ${pokemon.base_experience}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="tab">
                        <input type="radio" name="css-tabs" id="tab-2" class="tab-switch">
                        <label for="tab-2" class="tab-label">Base Stats</label>
                        <div class="tab-content">
                            <table class="pokemon-table">
                                ${pokemon.stats.map((index) => `<tr>
                                    <td>${index.stat.name}:</td>
                                    <td>
                                        <div class="show-stats">
                                            <div class="stat-value">${index.base_stat}</div>
                                            <div class="stat-bar" style="--value:${index.base_stat}; --max:255;">
                                                <span class="stat-label">255</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`).join("")}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
}

function getHtmlSearchForDetail(i, types, colorType) {
    let pokemon = dataSearchArrayPokemon[i];  
    return `
    <div class="dialog-frame-open">
        <div class="dialog-header" style="background: ${colorType}; position: relative;">
            <div id="dialog-picture-control">
                <div>
                    <button id="previous-picture" onclick="prevPicture(${i})"><span class="previous-picture"></span>
                    </button>
                    <button id="next-picture" onclick="nextPicture(${i})"><span class="next-picture"></span>
                    </button>
                </div>
                <div>
                    <button aria-label="Dialog schliessen" id="dialog-close" onclick="dialogClose()"
                    aria-controls="dialog-frame"><span class="close-button"></span>
                    </button>
                </div>
            </div>
            <div class="dialog-headline">
                <div class="dialog-name">
                    <h2 class="dialog-title">${pokemon.name}</h2>
                    <div class="background-types">
                        ${types}
                    </div>
                </div>
                <h2 class="dialog-title">id:${pokemon.id}</h2>
            </div>
            <div class="current-detail">
                <img class="current-detail-img" src="${pokemon.sprites.other['official-artwork'].front_default}">
            </div>
        </div>
        <div id="dialog-content">
                <div class="wrapper-tab">
                    <div class="tabs">
                        <div class="tab">
                            <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch">
                            <label for="tab-1" class="tab-label">About</label>
                            <div class="tab-content">
                            <table class="pokemon-table">
                                <tr>
                                    <td>
                                        Height:
                                    </td>
                                    <td>
                                        ${pokemon.height} dm / ${(pokemon.height * 10).toFixed(1)} cm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Weight:
                                    </td>
                                    <td>
                                        ${pokemon.weight} hg / ${(pokemon.weight / 10).toFixed(1)} kg
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Abilities:
                                    </td>
                                    <td>
                                        ${pokemon.abilities.map(index => `${index.ability.name}`).join(" / ")}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Base-Exp.:
                                    </td>
                                    <td>
                                        ${pokemon.base_experience}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="tab">
                        <input type="radio" name="css-tabs" id="tab-2" class="tab-switch">
                        <label for="tab-2" class="tab-label">Base Stats</label>
                        <div class="tab-content">
                            <table class="pokemon-table">
                                ${pokemon.stats.map((index) => `<tr>
                                    <td>${index.stat.name}:</td>
                                    <td>
                                        <div class="show-stats">
                                            <div class="stat-value">${index.base_stat}</div>
                                            <div class="stat-bar" style="--value:${index.base_stat}; --max:255;">
                                                <span class="stat-label">255</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`).join("")}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
}

function getHtmlMinSearchText() {
    return `
    <div class="min-search">
        <h2 class="h2-card-title">At least 3 letters</h2>
    </div>
    `;
}
function getHtmlNoType() {
    return `
    <div class="no-type">
        <h2 class="h2-card-title">Couldn't find a Pokemon</h2>
    </div>
    `;
}

function getHtmlForError() {
    return `
    <div class="api-error">
        <h2 class="h2-card-title">Error with the connection to the server<br>https://pokeapi.co/</h2>
    </div>
    `;
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