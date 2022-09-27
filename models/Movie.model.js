const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }, 
    genre: {
        type: String,
    },
    plot: {
        type: String,
    },
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "celebrity" }],
    slug: {
        type: String,
        unique: true,
        required: true,
      },
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = { Movie };