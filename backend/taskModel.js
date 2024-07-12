const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    ID: Number,
    Task: String,
    Current_date: Date,
    Due_date: Date
});

module.exports = mongoose.model('Data', dataSchema);