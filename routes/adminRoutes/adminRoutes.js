const express = require('express');
const adminController = require('../../controller/controller');

const route = express.Router();

route.get('/add-product', adminController.getNewProduct);

route.post('/add-product', adminController.postNewProduct);

route.get('/products', adminController.getAdminProducts);

route.get('/edit-product/:id', adminController.getEditProduct);

route.post('/edit-product/save', adminController.postEditProduct);

route.post('/delete-product', adminController.postDeleteProduct);

module.exports = route;