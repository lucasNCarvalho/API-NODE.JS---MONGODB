const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    user_id: String,
    user_name: String,
    user_date: String,
    user_email: String
});

module.exports = Person