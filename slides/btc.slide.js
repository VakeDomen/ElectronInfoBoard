const ipcRenderer = require('electron').ipcRenderer;

module.exports = (contentDom) => {

    let eur = false;
    let usd = false;

    const init = () => {
        contentDom.style.backgroundColor='#F4A460';
        contentDom.innerHTML += `
            <div class="container align" style="height:30vh;">
                <img src="./assets/btc.png"><br>
                <div class="level" id="btceur"></div><div class="level" id="btcusd"></div>
            </div>
        `;
        ipcRenderer.send('btc');
    }


    const isReady = () => {
        if (eur && usd) {
            eur = false;
            usd = false;
            return true;
        }
        return false;
    }

    updateBTCUSD = (event, diff, current) => {
        const content = document.getElementById('btcusd');
        content.innerHTML = `<h1 class="title"><b>${current} $ (<span class="${diff > 0 ? 'green' : 'red'}">${diff}%</span>)</b></h1>`;
        setTimeout(()=>{usd=true}, 1000);
    }
    
    updateBTCEUR = (event, diff, current) => {
        const content = document.getElementById('btceur');
        content.innerHTML = `<h1><b class="title">${current} € (<span class="${diff > 0 ? 'green' : 'red'}"><b>${diff}%</span>)</b></h1>`;
        setTimeout(()=>{eur=true}, 1000);
    }
    
    ipcRenderer.on('btcusd', updateBTCUSD);
    ipcRenderer.on('btceur', updateBTCEUR);

    init(contentDom);
    return isReady;
}
