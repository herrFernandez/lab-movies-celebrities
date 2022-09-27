const router = require("express").Router();

const { Movie } = require("../models/Movie.model");
const { Celebrity } = require("../models/Celebrity.model");

const { toSlug } = require("../utils/toSlug");

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
    const slug = toSlug(req.body.title);
    const newMovie = new Movie({ ...req.body, slug });
    await newMovie.save();
    res.redirect(`/movies/${slug}`);
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

router.get("/movies/:movieSlug", async (req, res) => {
  try {
    const foundMovie = await Movie.findOne({ slug: req.params.movieSlug });
    console.log(foundMovie);
    await foundMovie.populate("cast");
    res.render("movies/movie-detail", { movieDetail: foundMovie });
  } catch (err) {
    res.render("not-found");
  }
});

// Movie delete & edit
router.post("/movies/:movieSlug/delete", async (req, res) => {
  console.log(req.body);
  try {
    const deleteMovie = await Movie.findOneAndDelete({ slug: req.params.movieSlug });
    res.redirect("/movies");
  } catch (err) {
    res.render("not-found");
  }
});

router.get("/movies/:movieSlug/edit", async (req, res) => {
  try {
    const editMovie = await Movie.findOne({ slug: req.params.movieSlug });
    console.log(editMovie);
    res.render("movies/edit-movie", { newMovieDetail: editMovie });
  } catch (err) {
    res.render("not-found");
  }
});

router.post("/movies/:movieSlug/edit", async (req, res) => {
  console.log(req.body);
  try {
    const sanitizedBody = Object.fromEntries(
      Object.entries(req.body).map([key, value]) 
    );
    
    const newSlug = toSlug(sanitizedBody.title);
    const sanitizedSlug = req.sanitize(req.params.movieSlug);

    await Movie.findOneAndUpdate(
      { slug: sanitizedSlug },
      { ...sanitizedBody, slug: newSlug }
    );
    res.redirect(`/movies/${newSlug}`);
  } catch (err) {
    res.render("not-found");
  }
});

module.exports = router;
