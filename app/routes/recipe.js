const express = require('express');
const router = express.Router();
const database = require('../config/dbconfig');

router.post('/', function(req, res) {
  const recipeName = req.body.recipeName;
  const preparationTime = req.body.preparationTime;
  const image = req.body.image;
  const calories = req.body.calories;
  const isPublic = req.body.isPublic;
  const isActive = 1;
  const ingredients = req.body.ingredients;
  const preparationSteps = req.body.preparationSteps;
  let categories = req.body.categories;

  console.log(req.body);

  if (!recipeName) {
    res.status(400).send('Please send recipe name');

    return;
  }

  if (!preparationTime) {
    res.status(400).send('Please send preparation time for the recipe');

    return;
  }

  if (!image || typeof image !== 'string') {
    res.status(400).send('Please send correct image path for the recipe');

    return;
  }

  if (!calories) {
    res.status(400).send('Please send calories for the recipe');

    return;
  }

  if (!isPublic) {
    res.status(400).send('Please send correct value for public recipe');

    return;
  }

  if (!ingredients) {
    res.status(400).send('Please send ingredients for the recipe');

    return;
  }

  if (!preparationSteps) {
    res.status(400).send('Please send preparation steps for the recipe');
    return;
  }

  if (!categories) {
    res.status(400).send('Please send the categories for the recipe');
    return;
  }

  let sqlInsertRecipe = `INSERT INTO Recipe 
                      (recipe_name, preparation_time, image, calories, is_public, 
                        is_active, ingredients, preparation_steps, categories) 
                        VALUES
                        (?, ?, ?, ?, ?, ?, ?, ?, ?) `;

  let sqlInsertUserRecipe = `INSERT INTO User_Recipe 
                      (user_id, recipe_id) 
                        VALUES
                        (?, ?) `;

  let sqlInsertCategoryRecipe = `INSERT INTO Category_Recipe
                      (category_id, recipe_id) 
                        VALUES
                        (?, ?) `;

  let addedRecipeId = '';

  database.serialize(function() {
    database.run("BEGIN");

    database.run(sqlInsertRecipe, [recipeName, preparationTime, image, calories,
      isPublic, isActive, ingredients, preparationSteps, categories], function(err) {

      if (err) {
        res.end("Transaction cancelled");
      } else {
        const userId = req.session.user.id;
        addedRecipeId = this.lastID;

        database.run(sqlInsertUserRecipe, [userId, addedRecipeId], function(err) {
          if (err) {
            database.rollback;

            res.end("Transaction cancelled");
          } else {
            database.run('commit');

            categories = JSON.parse(categories);

            categories.forEach(categoryId => {
              console.log(categoryId);
              database.run(sqlInsertCategoryRecipe, [categoryId, addedRecipeId], function(err) {
                if (err) {
                  res.status(500).send('Something went wrong');

                  return;
                }

              });
            });

            res.end("Transaction succeed");
          }
        })
      }
    });
  });
});

router.get('/:recipeId', function(req, res) {
  const recipeId = parseInt(req.params.recipeId);

  if (recipeId <= 0) {
    res.status(400).send('Please enter a valid recipe id');

    return;
  }

  let sql = `SELECT *
           FROM Recipe
           WHERE id = ?`;

  database.get(sql, [recipeId], (err, row) => {
    if (err) {
      res.status(500).send('Something went wrong');

      return;
    }

    if (!row) {
      res.status(400).send('No such recipe found');
      return;
    }

    res.send(JSON.stringify(row));
    return true;
  });
});

router.put('/:recipeId', function(req, res) {
  const recipeId = parseInt(req.params.recipeId);

  const recipeName = req.body.recipeName;
  const preparationTime = req.body.preparationTime;
  const image = req.body.image;
  const calories = req.body.calories;
  const isPublic = req.body.isPublic;
  const isActive = 1;
  const ingredients = req.body.ingredients;
  const preparationSteps = req.body.preparationSteps;

  if (!recipeName) {
    res.status(400).send('Please send recipe name');

    return;
  }

  if (!preparationTime) {
    res.status(400).send('Please send preparation time for the recipe');

    return;
  }

  if (!image || typeof image !== 'string') {
    res.status(400).send('Please send correct image path for the recipe');

    return;
  }

  if (!calories) {
    res.status(400).send('Please send calories for the recipe');

    return;
  }

  if (!isPublic) {
    res.status(400).send('Please send correct value for public recipe');

    return;
  }

  if (!ingredients) {
    res.status(400).send('Please send ingredients for the recipe');

    return;
  }

  if (!preparationSteps) {
    res.status(400).send('Please send preparation steps for the recipe');
    return;
  }

  if (recipeId <= 0) {
    res.status(400).send('Please enter a valid recipe id');

    return;
  }

  let sql = `SELECT *
           FROM Recipe
           WHERE id = ?`;

  let updateSql = `UPDATE Recipe
            SET recipe_name = ?, preparation_time = ?, image = ?, calories = ?, is_public = ?, 
                        is_active = ?, ingredients = ?, preparation_steps = ?
            WHERE id = ?`;

  database.get(sql, [recipeId], (err, row) => {
    if (err) {
      res.status(500).send('Something went wrong');

      return;
    }

    if (!row) {
      res.status(400).send('There is no such recipe');
    } else {
      database.run(updateSql, [recipeName, preparationTime, image, calories,
        isPublic, isActive, ingredients, preparationSteps, categories, recipeId], (err) => {

        if (err) {
          res.status(500).send('Something went wrong');

          return;
        }

        database.get(sql, [recipeId], (err, row) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Something went wrong');

            return;
          }

          res.send(JSON.stringify(row));
        });
      });
    }
  });
});

router.delete('/:recipeId', function(req, res) {
  const recipeId = parseInt(req.params.recipeId);

  const isActive = 0;

  if (recipeId <= 0) {
    res.status(400).send('Please enter a valid recipe id');

    return;
  }

  let sql = `SELECT *
           FROM Recipe
           WHERE id = ?`;

  let updateSql = `UPDATE Recipe
            SET is_active = ?
            WHERE id = ?`;

  database.get(sql, [recipeId], (err, row) => {
    if (err) {
      res.status(500).send('Something went wrong');

      return;
    }

    if (!row) {
      res.status(400).send('There is no such recipe');
    } else {

      if (!row.is_active) {
        res.status(404).send('Record not found');
      } else {
        database.run(updateSql, [isActive, recipeId], (err) => {

          if (err) {
            res.status(500).send('Something went wrong');

            return;
          }

          res.status(204);
        });
      }
    }
  });
});

module.exports = router;
