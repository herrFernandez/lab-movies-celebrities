const router = require("express").Router();

const { Celebrity } = require("../models/Celebrity.model");

// Iteration #3: Create new celebrity
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity");
  });
  
  router.post("/celebrities/create", async (req, res) => {
    console.log(req.body);
    try {
      const newCelebrity = new Celebrity({ ...req.body });
      await newCelebrity.save();
      res.redirect("/celebrities/");
    } catch (err) {
      res.render("celebrities/new-celebrity");
    }
  });

  router.get("/celebrities", async (req, res) => {
    try {
    const celebrities = await Celebrity.find();
    console.log(celebrities);
    res.render("celebrities/celebrities", { celebrities });
    } catch (err) {
        res.render("not-found");
      }
  });





module.exports = router;