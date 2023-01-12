const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let recipesSchema = new Schema({
    name: String,
    instructions: [{type: String}],
    ingredients: [{type: String}],
    categories: Array,
    images: Array
});

module.exports = mongoose.model("Recipe", recipesSchema);