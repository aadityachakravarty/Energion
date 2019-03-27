const geocode = require('./google/places');

const addresses = (req, res) => {
    if (req.body.address && (req.body.address.trim().length > 0)) {
        geocode(req.body.address, (err, data) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: err.message
                });
            }
            else {
                if (data.candidates.length > 0) {
                    let filtered = data.candidates.map((i) => {
                        return { 'name': i.name, 'address': i.formatted_address, 'location': i.geometry.location };
                    });
                    res.json({
                        success: true,
                        msg: 'Matches.',
                        data: filtered
                    });
                }
                else {
                    res.json({
                        success: false,
                        msg: 'No results found'
                    });
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

module.exports = addresses;