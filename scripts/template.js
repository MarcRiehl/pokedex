function getHTMLForThumbs(i, colorType) {
    return `

    <div class="card" onclick="openPicture(${i})">
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

function getHtmlForDetail(i) {
    return `
          <div class="dialog-frame-open">
                        <div class="dialog-header">
                            <h2 id="dialog-title">${dataArrayPokemon[i].name} / id:${i + 1}</h2>
                            <button aria-label="Dialog schliessen" id="dialog-close" onclick="dialogClose()"
                                aria-controls="dialog-frame"><span class="close-button"></span></button>
                        </div>
                        <div id="dialog-content">
                            <img id="dialog-picture" src="">
                            <div id="dialog-picture-control">
                                <button id="previous-picture" onclick="prevPicture(${i})"><span
                                        class="previous-picture"></span></button>
                                <div id="dialog-picture-number"></div>
                                <button id="next-picture" onclick="nextPicture(${i})"><span
                                        class="next-picture"></span></button>
                            </div>
                        </div>
         </div>
`;
}

