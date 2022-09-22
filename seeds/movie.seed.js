const { default: mongoose } = require("mongoose");
const { Celebrity } = require("../models/Celebrity.model");
const { Movie } = require("../models/Movie.model");

const movies = [
  { 
    title: "Marlon Brando", 
    genre: "actor, political activist", 
    plot: "Regret is useless in life. It's in the past. All we have is now.",
    cast: 
     },
  
];

require("../db");


Movie.create(movies)
  .then((done) => {
    console.log("Successfully inserted", done);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });
