const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    companyName: {type: String},
    address: {type: String},
    city: {type: String},
    country: {type: String},
    sector: {type: String},
    website: {type: String},
    admin : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    imageId: {type: String},
    imageVersion: {type: String, default: ''}
});

module.exports = mongoose.model("Company", companySchema);