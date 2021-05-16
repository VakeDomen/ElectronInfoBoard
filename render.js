const ipcRenderer = require('electron').ipcRenderer;
const BtcSlide = require('./slides/btc.slide');
const EthSlide = require('./slides/eth.slide');
const AdaSlide = require('./slides/cardano.slide');
const DogeSlide = require('./slides/doge.slide');
const help = require('./helpers/helper');

let transititonReady = () => false;

const createDogeSlide = () => {
    transititonReady = DogeSlide(document.getElementById('tmp-content'));
}

const createBtcSlide = () => {
    transititonReady = BtcSlide(document.getElementById('tmp-content'));
}

const createEthSlide = () => {
    transititonReady = EthSlide(document.getElementById('tmp-content'));
}

const createAdaSlide = () => {
    transititonReady = AdaSlide(document.getElementById('tmp-content'));
}

const nextSlide = async () => {
    const content = document.getElementById('content');
    const tmpcontent = document.getElementById('tmp-content');
    const next = slides.shift();
    slides.push(next);
    next();
    while(!transititonReady()) {
        await help.delay(500);
    }
    content.innerHTML = tmpcontent.innerHTML;
    content.style = tmpcontent.style;
    tmpcontent.innerHTML = '';
    document.body.style.backgroundColor = tmpcontent.style.backgroundColor;
}


const slides = [
    createDogeSlide,
    createAdaSlide,
    createBtcSlide,
    createEthSlide,
];

ipcRenderer.on('next', nextSlide);