const { default: mongoose } = require("mongoose");
const { Celebrity } = require("../models/Celebrity.model");

const celebrities = [
  { name: "Marlon Brando", occupation: "actor, political activist", catchPhrase: "Regret is useless in life. It's in the past. All we have is now." },
  { name: "Denzel Washington", occupation: "actor, director, and producer", catchPhrase: "I say luck is when an opportunity comes along and you're prepared for it." },
  { name: "Clint Eastwood", occupation: "actor, film director, producer and composer", catchPhrase: "If you want a guarantee, buy a toaster." },
  { name: "Audrey Hepburn", occupation: "actress, model, dancer and activist", catchPhrase: "Nothing is impossible; the word itself says I'm possible!" },
  { name: "Sophia Loren", occupation: "actress and model", catchPhrase: "There is a fountain of youth: it is your mind, your talents, the creativity you bring to your life and the lives of people you love. When you learn to tap this source, you will truly have defeated age." },
];

require("../db");


Celebrity.create(celebrities)
  .then((done) => {
    console.log("Successfully inserted", done);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });
