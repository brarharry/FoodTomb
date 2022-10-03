const router = require('express').Router();
let Food = require('../models/foodItems.model');

router.route('/').get((req, res) => {
  Food.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const foodname = req.body.foodname;
  const quantity = req.body.quantity;
  const expiryDate = req.body.expiryDate;
  
  
  const newFood = new Food({
      foodname,
      quantity,
      expiryDate
    });

  newFood.save()
    .then(() => res.json('Food added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Food.findById(req.params.id)
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;