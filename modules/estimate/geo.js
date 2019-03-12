const request = require('request')
const config = require(__base + 'system/config.json')

const apiKey = config.details.api.locationIQ

const geoMatrix = (address, next) => {
    let options = {
        url: `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&q=${address}&format=json`,
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
