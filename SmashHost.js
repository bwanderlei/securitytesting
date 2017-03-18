const request = require('request');
const randomWords = require('./RandomWords');

const randomWordsLength = randomWords.length;

module.exports = (options) => {
    let requestOptions = {
        method: options.method
    };

    if (options.json.length) {
        requestOptions.json = options.json;
    }

    for (let i = 0; i < parseInt(options.iterations); i++) {
        requestOptions.url = options.url.replace(/%/, randomWords[i % randomWordsLength]);

	console.log(requestOptions);

        request(requestOptions, (error, response, body) => {
            if (error) {
                console.log('Request callback error: ', error);
            }

            if (response.statusCode >= 500) {
                console.log('Server error code: ', response.statusCode);
            }
        });
    }
}
