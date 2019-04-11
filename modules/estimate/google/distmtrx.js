const request = require('request')
const apiKey = cfg.api.google;

const distmat = (origin, destination, next) => {
    let options = {
        url:`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${apiKey}`,
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

module.exports = distmat;