const ipcRenderer = require('electron').ipcRenderer;

module.exports = (contentDom) => {

    let eur = false;
    let usd = false;

    const init = () => {
        contentDom.style.backgroundColor='lightgrey';
        contentDom.innerHTML += `
            <div class="container align" style="height:30vh;">
                <img src="./assets/cardano.png"><br>
                <div class="level" id="adaeur"></div><div class="level" id="adausd"></div>
            </div>
        `;
        ipcRenderer.send('ada');
    }


    const isReady = () => {
        if (eur && usd) {
            eur = false;
            usd = false;
            return true;
        }
        return false;
    }

    updateadaUSD = (event, diff, current) => {
        const content = document.getElementById('adausd');
        content.innerHTML = `<h1 class="title"><b>${current} $ (<span class="${diff > 0 ? 'green' : 'red'}">${diff}%</span>)</b></h1>`;
        setTimeout(()=>{usd=true}, 1000);
    }
    
    updateadaEUR = (event, diff, current) => {
        const content = document.getElementById('adaeur');
        content.innerHTML = `<h1 class="title"><b>${current} € (<span class="${diff > 0 ? 'green' : 'red'}"><b>${diff}%</span>)</b></h1>`;
        setTimeout(()=>{eur=true}, 1000);
    }
    
    ipcRenderer.on('adausd', updateadaUSD);
    ipcRenderer.on('adaeur', updateadaEUR);

    init(contentDom);
    return isReady;
}
