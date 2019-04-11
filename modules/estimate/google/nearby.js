const request = require('request')

const apiKey = cfg.api.google;

const nearbyPlaces = (location, radius, next) => {
    let options = {
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&keyword=kv%20electric%20substation&key=${apiKey}`,
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
            if (output.results.length > 0) {
                next(null, output);
            }
            else if (output.status) {
                next(output.status);
            }
        }
    })
}

module.exports = nearbyPlaces;