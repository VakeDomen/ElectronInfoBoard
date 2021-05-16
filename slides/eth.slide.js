const ipcRenderer = require('electron').ipcRenderer;

module.exports = (contentDom) => {

    let eur = false;
    let usd = false;

    const init = () => {
        contentDom.style.backgroundColor='darkgrey';
        contentDom.innerHTML += `
            <div class="container align" style="height:30vh;">
                <img src="./assets/ethereum1.png"><br>
                <div class="level" id="etheur"></div><div class="level" id="ethusd"></div>
            </div>
        `;
        ipcRenderer.send('eth');
    }


    const isReady = () => {
        if (eur && usd) {
            eur = false;
            usd = false;
            return true;
        }
        return false;
    }

    updateethUSD = (event, diff, current) => {
        const content = document.getElementById('ethusd');
        content.innerHTML = `<h1 class="title"><b>${current} $ (<span class="${diff > 0 ? 'green' : 'red'}">${diff}%</span>)</b></h1>`;
        setTimeout(()=>{usd=true}, 1000);
    }
    
    updateethEUR = (event, diff, current) => {
        const content = document.getElementById('etheur');
        content.innerHTML = `<h1 class="title"><b>${current} € (<span class="${diff > 0 ? 'green' : 'red'}"><b>${diff}%</span>)</b></h1>`;
        setTimeout(()=>{eur=true}, 1000);
    }
    
    ipcRenderer.on('ethusd', updateethUSD);
    ipcRenderer.on('etheur', updateethEUR);

    init(contentDom);
    return isReady;
}
