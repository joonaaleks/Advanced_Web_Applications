var express = require('express');
var router = express.Router();

/* GET route. */
router.get('/recipe/:food', function(req, res, next) {
  let recipe = `{"name":"${req.params.food}","instructions":"Boil water","ingredients":"Water"}`;
  var obj = JSON.parse(recipe);
  res.send(obj);
});

router.post('/recipe/', (req, res) => {
  let recipe = req.body;
  var obj = JSON.stringify(recipe);
  res.send(obj);
});

router.post('/images', (req, res) => {
  res.send(JSON.stringify("Hi"));
})
module.exports = router;
