const request = require('request');
const randomstring = require('randomstring');

module.exports = (options) => {
    let requestOptions = {
        method: options.method
    };

    if (options.json.length) {
        requestOptions.json = options.json;
    }

    for (let i = 0; i < parseInt(options.iterations); i++) {
        requestOptions.url = options.url.replace(/%/, randomstring.generate());

        request(requestOptions, (error, response, body) => {
            if (error) {
                console.log('Request callback error: ', error);
            }
console.log(requestOptions);
            if (response.statusCode >= 500) {
                console.log('Server error code: ', response.statusCode);
            }
        });
    }
}
