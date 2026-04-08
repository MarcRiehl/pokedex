
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
            <button id="previous-picture" onclick="prevPicture(${i})"><span class="previous-picture"></span></button>
            <button id="next-picture" onclick="nextPicture(${i})"><span class="next-picture"></span></button>
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
      <td>Height: 
      </td>
       <td>
      ${pokemon.height} dm / ${(pokemon.height * 10).toFixed(1)} cm
      </td>
      </tr>
      <tr>
      <td>Weight: 
      </td>
       <td>
      ${pokemon.weight} hg / ${(pokemon.weight / 10).toFixed(1)} kg
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
      <tr>
      <td> ${pokemon.stats[0].stat.name}
      </td>
       <td>
       ${pokemon.stats[0].base_stat}
      </td>
      </tr>
      </table> 
      </div>
    </div>
    <div class="tab">
      <input type="radio" name="css-tabs" id="tab-3" class="tab-switch">
      <label for="tab-3" class="tab-label">Evolution</label>
      <div class="tab-content">
       <table class="pokemon-table">
      <tr>
      <td> ${pokemon.stats[0].stat.name}
      </td>
       <td>
       ${pokemon.stats[0].base_stat}
      </td>
      </tr>
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
            <button id="previous-picture" onclick="prevSearchPicture(${i})"><span class="previous-picture"></span></button>
            <button id="next-picture" onclick="nextSearchPicture(${i})"><span class="next-picture"></span></button>
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
      <td>Height: 
      </td>
       <td>
      ${pokemon.height} dm / ${(pokemon.height * 10).toFixed(1)} cm
      </td>
      </tr>
      <tr>
      <td>Weight: 
      </td>
       <td>
      ${pokemon.weight} hg / ${(pokemon.weight / 10).toFixed(1)} kg
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
      <tr>
      <td> ${pokemon.stats[0].stat.name}
      </td>
       <td>
       ${pokemon.stats[0].base_stat}
      </td>
      </tr>
      </table> 
      </div>
    </div>
    <div class="tab">
      <input type="radio" name="css-tabs" id="tab-3" class="tab-switch">
      <label for="tab-3" class="tab-label">Evolution</label>
      <div class="tab-content">
       <table class="pokemon-table">
      <tr>
      <td> ${pokemon.stats[0].stat.name}
      </td>
       <td>
       ${pokemon.stats[0].base_stat}
      </td>
      </tr>
      </table> 
      </div>
    </div>
  </div>
</div>
    </div>
</div>
`;
}
