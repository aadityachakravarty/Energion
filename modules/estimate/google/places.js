const request = require('request')
const config = require(__base + 'system/config.json')

const apiKey = config.details.api.google;

const geocodeapi = (address, next) => {
    let options = {
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&inputtype=textquery&fields=formatted_address,name,geometry&key=${apiKey}`,
        headers: {
            'User-Agent': 'request'
        }
    }
    request.get(options, (err, res) => {
        if (err) {
            next(err);
        }
        else {
            let output = JSON.parse(res.body);
            next(null, output);
        }
    })
}

module.exports = geocodeapi;