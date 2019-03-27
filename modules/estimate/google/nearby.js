const request = require('request')
const config = require(__base + 'system/config.json')

const apiKey = config.details.api.loc;

const nearbyPlaces = (location, api_options, next) => {
    let options = {
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${api_options.radius}&keyword=kv%20electric%20substation&key=${apiKey}`,
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

module.exports = nearbyPlaces;