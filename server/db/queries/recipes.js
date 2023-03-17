const db = require('../../configs/db.config');

const getSavedRecipesByUser = (id) => {
  return db.query("SELECT * FROM recipes WHERE user_id = $1 AND saved = true;", [id]).then(data => {
    return data.rows;
  })
    .catch((error) => console.log(error));

};

const addRecipe = (name, instructions, servings, prep_time, cook_time, saved, user_id, food_item_id) => {
  return db
    .query(
      `
  INSERT INTO recipes (name, instructions, servings, prep_time, cook_time, saved, user_id, food_item_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `,
      [name, instructions, servings, prep_time, cook_time, saved, user_id, food_item_id]
    )
    .then((user) => {
      return user.rows[0];
    })
    .catch((error) => console.log(error));
};

const updateRecipe = (id, note) => {
  return db.query('UPDATE recipes SET note = $2 WHERE id = $1 RETURNING *;', [id, note])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.log(err));
};

module.exports = { getSavedRecipesByUser, addRecipe, updateRecipe };
