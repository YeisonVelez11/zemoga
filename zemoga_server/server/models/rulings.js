const mongoose = require('mongoose');

let roleThumbs = {
    values: ["positive", "negative", null]
}

let Schema = mongoose.Schema;

let rulingSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },

    picture: {
        type: String,
    },
    lastUpdated: {
        type: Date
    },
    votes: {
        type: Object,
        positive: {
            type: Number
        },
        negative: {
            type: Number
        },
        positive_percentage: {
            type: Number
        },
        positive_percentage: {
            type: Number
        }
    },
    thumb: {
        type: String,
        default: null,
        enum: roleThumbs
    }

})




module.exports = mongoose.model('Ruling', rulingSchema);