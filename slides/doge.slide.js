const ipcRenderer = require('electron').ipcRenderer;

module.exports = (contentDom) => {

    let eur = false;
    let usd = false;

    const init = () => {
        contentDom.style.backgroundColor='lightyellow';
        contentDom.innerHTML += `
            <div class="container align" style="height:30vh;">
                <img src="./assets/dogecoin.png"><br>
                <div class="level" id="dogeeur"></div><div class="level" id="dogeusd"></div>
            </div>
        `;
        ipcRenderer.send('doge');
    }


    const isReady = () => {
        if (eur && usd) {
            eur = false;
            usd = false;
            return true;
        }
        return false;
    }

    updatedogeUSD = (event, diff, current) => {
        const content = document.getElementById('dogeusd');
        content.innerHTML = `<h1 class="title"><b>${current} $ (<span class="${diff > 0 ? 'green' : 'red'}">${diff}%</span>)</b></h1>`;
        setTimeout(()=>{usd=true}, 1000);
    }
    
    updatedogeEUR = (event, diff, current) => {
        const content = document.getElementById('dogeeur');
        content.innerHTML = `<h1 class="title"><b>${current} € (<span class="${diff > 0 ? 'green' : 'red'}"><b>${diff}%</span>)</b></h1>`;
        setTimeout(()=>{eur=true}, 1000);
    }
    
    ipcRenderer.on('dogeusd', updatedogeUSD);
    ipcRenderer.on('dogeeur', updatedogeEUR);

    init(contentDom);
    return isReady;
}
