// routes/users.js
const express = require('express');
const router = express.Router();
const foodItems = require('../db/queries/food_items');

router.get('/kitchenItemList', (req, res) => {
  foodItems.getAllKitchenItemsByUserId(1).then(data => {
    console.log(data);
    res.json({foodItems: data});
  })
});

router.get('/groceryItemList', (req, res) => {
  foodItems.getAllGroceryItemsByUserId(1).then(data => {
    console.log(data);
    res.json({foodItems: data});
  })
});

module.exports = router