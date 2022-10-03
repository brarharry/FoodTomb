const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipeName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  description: {
      type: String,
      required: true,
      trim: true
  },
  ingredientsNeeded: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;