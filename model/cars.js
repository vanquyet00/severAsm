const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
    codeCar: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    year: {
        type: String
    },
    images: [
        {
            type: String,
        }
    ]
});

var Cars = mongoose.model("Cars", carsSchema);

module.exports = {Cars};




