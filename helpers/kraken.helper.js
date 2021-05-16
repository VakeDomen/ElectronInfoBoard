const KrakenClient = require('kraken-api');
const kraken       = new KrakenClient(process.env.KRAKEN_KEY, process.env.KRAKEN_SECRET);

// const historyCahe = {};

// module.exports.getUSDPricesAt = async function(currency, timestamp) {
//     if (!(historyCahe[currency] && timestamp === historyCahe[currency][0])) {
//         historyCahe[currency] = [
//             timestamp, 
//             await kraken.api('Trades', { pair : currency, since: timestamp })
//         ];
//     }
//     return Promise.resolve(historyCahe[currency][1]);
// }

module.exports.getPrices = function(pairs) {
    return kraken.api('OHLC', { pair : pairs, interval: 5 }); 
}