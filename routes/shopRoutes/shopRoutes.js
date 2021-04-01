const express = require('express');
const shopController = require('../../controller/controller');

const route = express.Router();

route.get('/cart', shopController.getCart);

route.post('/cart/deleteItem', shopController.postDeleteItem);

route.post('/cart', shopController.postCart);

route.get('/:productId', shopController.getProduct);

route.get('/', shopController.getStart);

module.exports = route;