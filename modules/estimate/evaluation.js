const nearby = require('./google/nearby');
const matrix = require('./google/distmtrx');
const rad = require(__base + 'modules/misc/rad');
const rates = require(__base + 'models/rates.js');

const getStations = (location, next, radius = 10000) => {
    nearby(location, radius, (err, data) => {
        if (err) {
            next(err);
        }
        else {
            if ((data.results.length > 0) && (radius >= 10000)) {
                let out = {
                    radius,
                    results: data.results
                }
                next(null, out);
            }
            else if (radius == 15000) {
                next(null, []);
            }
            else {
                radius = 15000;
                nearby(location, radius, next);
            }
        }
    });
}

const eval = (req, res) => {
    // We check here in case the location or load are missing
    // for API driven calls.
    if (req.body.location && req.body.load) {
        // Recursive function to find nodes with variable radius
        getStations(req.body.location, (err, data) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: err.message
                });
            }
            else {
                if (data.results.length > 0) {
                    let requiredCapacity;
                    let availableOutputs = [];
                    // Now we format the data according to our rules
                    // And follow up, distance is aerial here.
                    let substations = data.results.map((i) => {
                        let power = i.name.replace(/\D/g, ' ').trim().split(' ').map((i) => {
                            let j = i ? parseInt(i) : 11;
                            availableOutputs.indexOf(j) == -1 ? availableOutputs.push(j) : null;
                            return j;
                        });
                        let distance = rad(req.body.location.lat, req.body.location.lng, i.geometry.location.lat, i.geometry.location.lng).toFixed(2);
                        return {
                            'name': i.name,
                            'location': i.geometry.location,
                            'power': power.sort(),
                            'distance': distance
                        }
                    });

                    // Now we have location and capacity of nearest substations
                    // So, now, we need to select a capacity then the nearest substation

                    if (req.body.load <= 5000) {
                        requiredCapacity = 11;
                    }

                    else if (req.body.load > 5000 && req.body.load <= 10000) {
                        requiredCapacity = 22;
                    }

                    else if (req.body.load > 10000 && req.body.load <= 15000) {
                        requiredCapacity = 33;
                    }

                    else {
                        requiredCapacity = 66;
                    }

                    // Now we shall eliminate the lower than required capacities.
                    let possible_ss = substations.filter((i) => {
                        if (i.power.indexOf(requiredCapacity) >= 0) {
                            return true;
                        }
                    });

                    if (possible_ss.length > 0) {

                        // Now we shall select the one with the lowest distance and capacity
                        let sortedStations = possible_ss.sort((a, b) => {
                            if (a.distance < b.distance)
                                return -1;
                            if (a.distance > b.distance)
                                return 1;
                            else
                                return 0;
                        });

                        // Now we select the best possible station.
                        let selectedStn = sortedStations[0];

                        // Here, we get the road distance between two coordinates.
                        matrix(req.body.location, selectedStn.location, (err, doc) => {
                            if (err) {
                                res.status(500).json({
                                    success: false,
                                    msg: err.message
                                })
                            }
                            else {
                                let roadDist = doc.rows[0].elements[0].distance.value;
                                selectedStn.distance = roadDist;
                                // Now the variables for cost estimation
                                let load = parseInt(req.body.load);
                                let current = parseInt(load / (1.732 * requiredCapacity * 0.95));
                                let length = selectedStn.distance;
                                let joints = parseInt(length / 1000);

                                rates.find({ 'rating': { $gt: current } }, (err, r) => {
                                    if (err) {
                                        res.status(500).json({
                                            success: false,
                                            msg: err.message
                                        });
                                    }
                                    else {
                                        let rates = r.sort((a, b) => {
                                            if (a.rating > b.rating) {
                                                return 1;
                                            }
                                            if (b.rating > a.rating) {
                                                return -1;
                                            }
                                            else {
                                                return 0;
                                            }
                                        })[0];

                                        // Here, we select the present rates
                                        let presentRates = {
                                            cable: rates.rates.sitc[requiredCapacity.toString()],
                                            joint: rates.rates.joints[requiredCapacity.toString()],
                                            termination: rates.rates.termination[requiredCapacity.toString()]
                                        }

                                        let bill = {
                                            cabling: presentRates.cable * length * 1.2,
                                            joints: presentRates.joint * joints,
                                            termination: presentRates.termination * 2,
                                            trench: 200 * length
                                        };

                                        res.json({
                                            success: true,
                                            data: {
                                                electrical: {
                                                    voltage: requiredCapacity * 1000,
                                                    current,
                                                    load,
                                                    amps: rates.rating
                                                },
                                                technical: {
                                                    length,
                                                    joints,
                                                    cableSize: rates.area
                                                },
                                                chart: presentRates,
                                                costs: bill,
                                                total: bill.cabling + bill.joints + bill.termination + bill.trench,
                                                user: {
                                                    location: req.body.location
                                                },
                                                substation: selectedStn
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        res.json({
                            success: false,
                            msg: 'No nearing nodes found.'
                        })
                    }
                }
                else {
                    res.json({
                        success: false,
                        msg: 'No substations found.'
                    });
                }
            }
        });
    }
    else {
        res.json({
            success: false,
            msg: 'Invalid Inputs'
        });
    }
}

module.exports = eval;