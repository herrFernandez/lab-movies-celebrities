const router = require("express").Router();

const { Movie } = require("../models/Movie.model");
const { Celebrity } = require("../models/Celebrity.model");

// Create new movie
router.get("/movies/create", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  } catch (err) {
    res.render("not-found");
  }
});

router.post("/movies/create", async (req, res) => {
  console.log(req.body);
  try {
    const newMovie = new Movie({ ...req.body });
    await newMovie.save();
    res.redirect("/movies");
  } catch (err) {
    res.render("movies/new-movie");
  }
});

// Movie feed & detail page
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    console.log(movies);
    res.render("movies/movies", { movies });
  } catch (err) {
    res.render("not-found");
  }
});

router.get("/movies/:movieId", async (req, res) => {
  try {
    const foundMovie = await Movie.findById(req.params.movieId);
    await foundMovie.populate("cast");
    console.log(foundMovie);
    res.render("movies/movie-detail", { movieDetail: foundMovie });
  } catch (err) {
    res.render("not-found");
  }
});

// Movie delete & edit
router.post("/movies/:movieId/delete", async (req, res) => {
  console.log(req.body);
  try {
    const deleteMovie = await Movie.findOneAndRemove(req.params.movieId);
    res.redirect("/movies");
  } catch (err) {
    res.render("not-found");
  }
});

router.get("/movies/:movieId/edit", async (req, res) => {
  try {
    const editMovie = await Movie.findById(req.params.movieId);
    await editMovie.populate("cast");
    console.log(editMovie);
    res.render("movies/edit-movie", { newMovieDetail: editMovie });
  } catch (err) {
    res.render("not-found");
  }
});

router.post("/movies/:movieId/edit", async (req, res) => {
  console.log(req.body);
  try {
    const editMovie = Object.fromEntries(
      Object.entries(req.body).map([key, value]) 
    );

    await Movie.findOneAndUpdate(editMovie);
    res.redirect("/movies");
  } catch (err) {
    res.render("not-found");
  }
});

module.exports = router;
