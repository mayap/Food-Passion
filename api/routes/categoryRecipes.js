const express = require('express');
const router = express.Router();
const database = require('../config/dbconfig');

router.get('/:categoryId/recipes', function(req, res) {
  const categoryId = parseInt(req.params.categoryId);

  if (categoryId <= 0) {
    res.status(400).send('Please enter a valid category id');

    return;
  }

  let sql = `SELECT Recipe.* FROM Recipe LEFT JOIN Category_Recipe ON Category_Recipe.recipe_id = Recipe.id WHERE Category_Recipe.category_id = ?`;

  database.all(sql, [categoryId], (err, row) => {
    if (err) {
      console.log(err.message);
      res.status(500).send('Something went wrong');

      return;
    }

    if (!row.length) {
      res.status(400).send('No recipes found for this category');

      return;
    }

    res.send(JSON.stringify(row));
    return true;
  });
});

module.exports = router;
