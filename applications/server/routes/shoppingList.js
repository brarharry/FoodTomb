const router = require('express').Router();
//const shoppingList = require('../models/shoppingList.model');
let ShoppingList = require('../models/shoppingList.model');

router.route('/').get((req, res) => {
  ShoppingList.find()
    .then(shoppingList => res.json(shoppingList))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const foodName = req.body.foodName;
  const quantity = req.body.quantity;
  
  const newFood = new ShoppingList({
      foodName,
      quantity,
    });

  newFood.save()
    .then(() => res.json('Food added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//==================================================
router.route('/:id').get((req, res) => {
    ShoppingList.findById(req.params.id)
      .then(shoppingList => res.json(shoppingList))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    ShoppingList.findByIdAndDelete(req.params.id)
      .then(() => res.json('Food deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    ShoppingList.findById(req.params.id)
      .then(shoppingList => {
        shoppingList.foodName= req.body.foodName;
        shoppingList.quantity = req.body.quantity;
  
        shoppingList.save()
          .then(() => res.json('Food updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;