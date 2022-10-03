const router = require('express').Router();
let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const recipeName = req.body.recipeName;
  const description = req.body.description;
  const ingredientsNeeded = req.body.ingredientsNeeded;
  
  const newRecipe = new Recipe({
      recipeName,
      description,
      ingredientsNeeded
    });

  newRecipe.save()
    .then(() => res.json('Recipe added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//==================================================
router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
      .then(recipes => res.json(recipes))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
      .then(() => res.json('Recipe deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Recipe.findById(req.params.id)
      .then(recipes => {
        recipes.recipeName= req.body.recipeName;
        recipes.description = req.body.description;
  
        recipes.save()
          .then(() => res.json('Recipe updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;