function getHTMLForThumbs(i, colorType) {
    return `
    <div class="card">
    <div class="list-thumb" style="background:${colorType}">
    <h2 class="h2-card-title">${dataArrayPokemon[i].name} / id:${i + 1}</h2>
            <div class="list-thumb-img">
            <div>
            <img class="current-thumb-img" src="${dataArrayPokemon[i].sprites.other['official-artwork'].front_default}">
            </div>
    </div>
    </div>
    `;
}

