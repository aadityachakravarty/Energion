const request = require('request')
const config = require(__base + 'system/config.json')

const apiKey = config.details.api.geoVar

const geoMatrix = (address, next) => {
    let options = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
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

module.exports = geoMatrix