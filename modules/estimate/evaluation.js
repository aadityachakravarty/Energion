const nearby = require('./google/nearby');
const rad = require(__base + 'modules/misc/rad.js')

const eval = (req, res) => {
    if (req.body.location && req.body.load) {
        let location = JSON.parse(req.body.location);
        let options = {
            radius: req.body.radius || 10000
        }

        let availableOutputs = [];

        nearby(location, options, (err, data) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: err.message
                });
            }
            else {
                if (data.results.length > 0) {
                    let substations = data.results.map((i) => {
                        let power = i.name.replace(/\D/g, ' ').trim().split(' ').map((i) => {
                            let j = i ? parseInt(i) : 11;
                            if (availableOutputs.indexOf(j) == -1) {
                                availableOutputs.push(j);
                            }
                            return j;
                        });
                        let distance = rad(location.lat, location.lng, i.geometry.location.lat, i.geometry.location.lng).toFixed(2);
                        return {
                            'name': i.name,
                            'location': {
                                'station': i.geometry.location,
                            },
                            'power': power.sort(),
                            'distance': distance
                        }
                    });
                    let sortedStations = substations.sort((a, b) => {
                        if (a.distance < b.distance)
                            return -1;
                        if (a.distance > b.distance)
                            return 1;
                        return 0;
                    })

                    // Station Selection setup
                    let sortAvOut = availableOutputs.sort((a, b) => {
                        if (a > b) {
                            return 1;
                        }
                        if (a < b) {
                            return -1;
                        }
                    });

                    let reqCap = sortAvOut[0];

                    if (req.body.load > 5000 && sortAvOut.length > 1) {
                        reqCap = sortAvOut[1];
                    }

                    if (req.body.load > 15000 && sortAvOut.length > 2) {
                        reqCap = sortAvOut[2];
                    }

                    let selectedStation = sortedStations.filter((s) => {
                        if (s.power.indexOf(reqCap) != -1) {
                            return true;
                        }
                    })[0];

                    // Cost Estimation Setup
                    selectedStation.costs = {
                        'cabling': 55 * selectedStation.distance,
                        'termination': 2000
                    }

                    // Client location add-on
                    selectedStation.location.client = location;

                    // Finally Send the output. 
                    res.json({
                        success: true,
                        msg: 'Estimate generated.',
                        data: selectedStation
                    });
                }
                else {
                    res.json({
                        success: false,
                        msg: 'No stations found.'
                    })
                }
            }
        });
    }
    else {
        res.json({
            success: false,
            msg: 'Invalid Inputs.'
        });
    }
}

module.exports = eval;