const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    id: String,
    name: String,
    date: String,
    email: String
});

module.exports = Person