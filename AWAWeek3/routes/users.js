var express = require('express');
var router = express.Router();
var array = [];

/* POST route. */
router.post("/todo", (req, res) => {
  var foundName = array.find(function(foundName) {
    return foundName.name === req.body.name
  })
  if (foundName) {
    foundName.todos.push(req.body.todos);
    res.send(JSON.stringify("Todo added"));
  } else {
    array.push({name: req.body.name, todos: [req.body.todos]});
    res.send(JSON.stringify("User added"));
  }
});

/*GET User*/
router.get("/user/:id", async (req, res) => {
  let foundName = await array.find(n => {
    return n.name === req.params.id;
  });
  if (array.includes(foundName)) {
    res.send(foundName)
  } else {
    res.send(JSON.stringify("User not found"));
  }
});

router.delete("/user/:id", async (req, res) => {
  let foundName = await array.find(n => {
    return n.name === req.params.id;
  });
  if (array.includes(foundName)) {
    array.splice(foundName);
    res.send(JSON.stringify("User deleted"));
  } else {
    res.send(JSON.stringify("User not found"));
  }
})

module.exports = router;
