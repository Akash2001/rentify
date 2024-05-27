const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    owner: Object,
    phoneNumber: String,
    email: String,
    password: String,
    type: String,
});