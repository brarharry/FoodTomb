const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    foodName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
      },
      quantity: {
          type: Number,
          required: true,
          trim: true
      },
});

const shoppingList = mongoose.model('shoppingList', shoppingListSchema);

module.exports = shoppingList;