const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: String,
    place: String,
    area: Number,
    bedrooms: Number,
    bathrooms: Number,
    hospitalsNearby: Number,
    collegesNearby: Number,
    owner: {
        _id: String,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String
    }
});

module.exports = propertySchema;