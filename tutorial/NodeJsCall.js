const https = require('https');

_EXTERNAL_URL = '';


const callExternalApiUsing = (callback) => {
    https.get(_EXTERNAL_URL, (resp) => {
    let data = '';

    // A chunk od data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        return callback(data);
        // console.log(JSON.stringify(data));
    });

    }).on("error", (err) => {

    console.log("Error: " + err.message);
    });
}

module.exports.callApi = callExternalApiUsingHttp;