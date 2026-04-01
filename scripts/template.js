function getHTMLForThumbs(i) {
    return `
    <div class="card">
    <div class="list-thumb">
    <h2 class="h2-card-title">${dataArrayPokemon[i].name}</h2>
            <div class="list-thumb-img">
            <div>
            <img class="current-thumb-img" src="${dataArrayPokemon[i].sprites.other['official-artwork'].front_default}">
            </div>
    </div>
    </div>
    `;
}

