const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ratesSchema = new schema({
    "rating": Number,
    "area": Number,
    "rates": {
        "cable": {
            "11": Number,
            "22": Number,
            "33": Number,
            "66": Number
        },
        "sitc": {
            "11": Number,
            "22": Number,
            "33": Number,
            "66": Number
        },
        "joints": {
            "11": Number,
            "22": Number,
            "33": Number,
            "66": Number
        },
        "termination": {
            "11": Number,
            "22": Number,
            "33": Number,
            "66": Number
        }
    }
});

module.exports = mongoose.model('Rate', ratesSchema);
