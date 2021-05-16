require('dotenv').config()
const { app, BrowserWindow, ipcMain } = require('electron');
const { Telegraf } = require('telegraf');
const kraken = require('./helpers/kraken.helper');

let window = null;

if (!process.env.BOT_TOKEN) {
    console.log("Bot token not specified!");
    process.exit(1);
}
if (!process.env.KRAKEN_SECRET) {
    console.log("Kraken secret not specified!");
    process.exit(1);
}
if (!process.env.KRAKEN_KEY) {
    console.log("Kraken key not specified!");
    process.exit(1);
}

const createWindow = () => {
    return new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
}

const nextSlide = (ctx) => {
    window.webContents.send('next', null);
}

const display = (win) => {
    window = win;
    window.loadFile('index.html')
}

ipcMain.on('btc', async (ctx) => {
    const pricesUSD = (await kraken.getPrices('XXBTZUSD')).result;
    window.webContents.send(
        'btcusd', 
        (
            (Number(pricesUSD['XXBTZUSD'][pricesUSD['XXBTZUSD'].length - 1][1]) / 
            Number(pricesUSD['XXBTZUSD'][pricesUSD['XXBTZUSD'].length - 288][1])
            - 1)
            * 100
        ).toFixed(2),
        Number(pricesUSD['XXBTZUSD'][pricesUSD['XXBTZUSD'].length - 1][1])
    );

    const pricesEUR = (await kraken.getPrices('XXBTZEUR')).result;
    window.webContents.send(
        'btceur', 
        (
            (Number(pricesEUR['XXBTZEUR'][pricesEUR['XXBTZEUR'].length - 1][1]) / 
            Number(pricesEUR['XXBTZEUR'][pricesEUR['XXBTZEUR'].length - 288][1]) 
            - 1)
            * 100
        ).toFixed(2),
        Number(pricesEUR['XXBTZEUR'][pricesEUR['XXBTZEUR'].length - 1][1]) 
    );
});

ipcMain.on('ada', async (ctx) => {
    const pricesUSD = (await kraken.getPrices('ADAUSD')).result;
    window.webContents.send(
        'adausd', 
        (
            (Number(pricesUSD['ADAUSD'][pricesUSD['ADAUSD'].length - 1][1]) / 
            Number(pricesUSD['ADAUSD'][pricesUSD['ADAUSD'].length - 288][1])
            - 1)
            * 100
        ).toFixed(2),
        Number(pricesUSD['ADAUSD'][pricesUSD['ADAUSD'].length - 1][1])
    );

    const pricesEUR = (await kraken.getPrices('ADAEUR')).result;
    window.webContents.send(
        'adaeur', 
        (
            (Number(pricesEUR['ADAEUR'][pricesEUR['ADAEUR'].length - 1][1]) / 
            Number(pricesEUR['ADAEUR'][pricesEUR['ADAEUR'].length - 288][1]) 
            - 1)
            * 100
        ).toFixed(2),
        Number(pricesEUR['ADAEUR'][pricesEUR['ADAEUR'].length - 1][1]) 
    );
});

ipcMain.on('doge', async (ctx) => {
    const pricesUSD = (await kraken.getPrices('XDGUSD')).result;
    window.webContents.send(
        'dogeusd', 
        (
            (Number(pricesUSD['XDGUSD'][pricesUSD['XDGUSD'].length - 1][1]) / 
            Number(pricesUSD['XDGUSD'][pricesUSD['XDGUSD'].length - 288][1])
            - 1)
            * 100
        ).toFixed(2),
        Number(pricesUSD['XDGUSD'][pricesUSD['XDGUSD'].length - 1][1])
    );

    const pricesEUR = (await kraken.getPrices('XDGEUR')).result;
    window.webContents.send(
        'dogeeur', 
        (
            (Number(pricesEUR['XDGEUR'][pricesEUR['XDGEUR'].length - 1][1]) / 
            Number(pricesEUR['XDGEUR'][pricesEUR['XDGEUR'].length - 288][1]) 
            - 1)
            * 100
        ).toFixed(2),
        Number(pricesEUR['XDGEUR'][pricesEUR['XDGEUR'].length - 1][1]) 
    );
});

ipcMain.on('eth', async (ctx) => {
    const pricesUSD = (await kraken.getPrices('XETHZUSD')).result;
    window.webContents.send(
        'ethusd', 
        (
            (Number(pricesUSD['XETHZUSD'][pricesUSD['XETHZUSD'].length - 1][1]) / 
            Number(pricesUSD['XETHZUSD'][pricesUSD['XETHZUSD'].length - 288][1])
            - 1)
            * 100
        ).toFixed(2),
        Number(pricesUSD['XETHZUSD'][pricesUSD['XETHZUSD'].length - 1][1])
    );

    const pricesEUR = (await kraken.getPrices('XETHZEUR')).result;
    window.webContents.send(
        'etheur', 
        (
            (Number(pricesEUR['XETHZEUR'][pricesEUR['XETHZEUR'].length - 1][1]) / 
            Number(pricesEUR['XETHZEUR'][pricesEUR['XETHZEUR'].length - 288][1]) 
            - 1)
            * 100
        ).toFixed(2),
        Number(pricesEUR['XETHZEUR'][pricesEUR['XETHZEUR'].length - 1][1]) 
    );
});

app.whenReady().then(() => {
    display(createWindow())
    const bot = new Telegraf(process.env.BOT_TOKEN)
    bot.command('next', nextSlide);
    bot.launch();
    nextSlide();
    setInterval(nextSlide, 10000);
});