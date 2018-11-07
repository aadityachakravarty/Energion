var mongoose = require('mongoose');
var schema = mongoose.Schema

var user = new schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        }
    },
    code: {
        email: String,
        phone: String,
        reset: String
    },
    status: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    logs: {
        login: [Date],
        logout: [Date]
    }
})

module.exports = mongoose.model('User', user)
