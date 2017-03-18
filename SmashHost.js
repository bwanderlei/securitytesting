const request = require('request');
const randomstring = require('randomstring');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const alphabetLength = alphabet.length;

module.exports = (options) => {
    let requestOptions = {
        method: options.method
    };

    if (options.json.length) {
        requestOptions.json = options.json;
    }

    for (let i = 0, a = 0; i < parseInt(options.iterations); i++) {
        requestOptions.url = options.url.replace(/%/, randomstring.generate() + alphabet[a++ % alphabetLength]);

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
