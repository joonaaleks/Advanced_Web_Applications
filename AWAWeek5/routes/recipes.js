var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Recipes = require("../models/Recipes");
const Category = require("../models/Category");
const Images = require("../models/Images");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

/* GET routes */
router.get('/diet', (req, res, next) => {
  Category.find({}, (err, diet) => {
    if (err) {
      if(err.name === "CastError") {
        return res.status(404).send(JSON.stringify(`Recipes not found`));
      }
      return next(err);
    }
    if(diet) {
      return res.send(diet);
    } else {
      return res.status(404).send(JSON.stringify(`Recipes not found`));
    };
  });
});


router.get('/recipe/:food', function(req, res, next) {
  Recipes.findOne({name: req.params.food}, (err, recipe) => {
    console.log(recipe)
    if (err) {
      if(err.name === "CastError") {
        return res.status(404).send(JSON.stringify(`Recipe ${req.params.food} not found`));
      }
      return next(err);
    }
    if(recipe) {
      return res.send(recipe);
    } else {
      return res.status(404).send(JSON.stringify(`Recipe ${req.params.food} not found`));
    }
  })
  /*let recipe = `{"name":"${req.params.food}","instructions":"Boil water","ingredients":"Water"}`;
  var obj = JSON.parse(recipe);
  res.send(obj);*/
});

router.get("/images/:imageId", (req, res, next)  => {
  const id = req.params.imageId;
  Images.findOne({_id: id}, (err, img) => {
    if(err) {
      return next(err);
    };
    if(img) {
      console.log(img.buffer.buffer);
      return res.send(img);
    } else {
      return res.status(404).send(JSON.stringify(`Recipe with image not found`));
    }
  })
})

//POST Routes
router.post('/recipe/', (req, res, next) => {
  Recipes.findOne({name: req.body.name}, (err, name) => {
    if(err) {
      return next(err)
    };
    if(!name) {
      new Recipes({
        name: req.body.name,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        categories: req.body.diets
      }).save((err) => {
        if(err) {
          return next(err);
        } else {
          return res.send(req.body);
        }
      })
    } else {
      return res.status(403).send(JSON.stringify("This recipe is already in the database!"));
    }
  });
  /*let recipe = req.body;
  var obj = JSON.stringify(recipe);
  res.send(obj);*/
});

router.post('/images', upload.array("images"), (req, res) => {
  console.log(req.files);
  console.log(req.body.img);
  Recipes.findOne({name: req.body.img}, (err, img) => {
    if(err) {
      return next(err);
    };
    if(img) {
      req.files.forEach(image => {
        let db = new Images({
          buffer: image.buffer,
          mimetype: image.mimetype,
          name: image.originalname,
          encoding: image.encoding,
        });
        db.save((err) => {
          if(err) {
            return next(err);
          }
        })
        img.images.push(db._id);
        img.save();
      })
    } else {
      return res.status(403).send(JSON.stringify("Recipe not found"));
    }
  })
  console.log("2");
  res.send(JSON.stringify("Hi"));
})
module.exports = router;
