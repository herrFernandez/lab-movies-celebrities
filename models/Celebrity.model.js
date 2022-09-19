const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebrytySchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    occupation: {
        type: String,
    },
    catchPhrase: {
        type: String,
    },

});

const Celebrity = mongoose.model("celebrity", celebrytySchema);

module.exports = { Celebrity };