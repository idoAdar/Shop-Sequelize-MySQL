const { render } = require('ejs');
const { request, response } = require('express');
const Product = require('../models/product');
const Cart = require('../models/cart');

// Shop Controller:
exports.getStart = (req, res, next) => {
    Product.findAll()   // 'findAll' fetch all the data from MySQL table - NOTICE: findAll return an array
    .then(products => {
        res.render('productList', { path: '/', title: 'SHOP', prod: products });
    })
    .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findByPk(id)    // 'findByPk' fetch the excat field from MySQL table - NOTICE: findByPk return object
    .then((product) => {
        res.render('productDetails', { path: 'ITEM', prod: product });
    })
    .catch(err => console.log(err));

    // Altenrative with Conditions (notice that findAll bring us an array so in this case we should use [0] - beacuse its only one element):
/*     Product.findAll({where: { id: id }})
    .then(product => {
        res.render('productDetails', { path: 'ITEM', prod: product[0] });
    })
    .catch(err => console.log(err)); */
}

// New Product Controller:
exports.getNewProduct = (req, res, next) => {
    res.render('newProduct', { path: '/admin/add-product', title: 'NEW-PRODUCT' })
}

exports.postNewProduct = (req, res, next) => {
    const item = req.body.item;
    const img = req.body.img;
    const price = req.body.price;
    const description = req.body.description;
    // NOTICE: 'create' auto save data into MySQL table
    // But here use can use 'createProduct', cause we set ralation witch mean that User has many Product
    Product.create({    
        item: item,
        price: price,
        img: img,
        description: description
    })
    .then(result => {
        res.redirect('/');
    })
    .catch(err => console.log(err));
}

// Cart Controller:
exports.getCart = (req, res, next) => {
    Cart.findAll()
    .then(products => {
        const newProducts = products.map(product => {
            return {
                item: product.item,
                id: product.id
            }
        })
        return newProducts;
    })
    .then(products => {
        res.render('cart', { path: '/cart', prod: products });
    })
    .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const item = req.body.item;
    Cart.create({
        item: item
    })
    .then(result => {
        res.redirect('/cart');
    })
}

exports.postDeleteItem = (req, res, next) => {
    const id = req.body.id;
    Cart.destroy({where: { id: id }})
    .then(result => {
        res.redirect('/cart');
    })
}

// Admin Products Controller:
exports.getAdminProducts = (req, res, next) => {
    Product.findAll()  // NOTICE: getProducts its a function that we get by using 'createProduct' - and not just 'create'
    .then(products => {
        res.render('adminProductsList', { path: '/admin/products', title: 'SHOP', prod: products });
    })
    .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findByPk(id)
    .then(result => {
        res.render('edit-product', { path: 'edit', title: 'Edit', prod: result.dataValues })
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const updateItem = req.body.item;
    const updateImg = req.body.img;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    Product.findByPk(id)
    .then(instance => {
        instance.item = updateItem;
        instance.img = updateImg;
        instance.price = updatePrice;
        instance.description = updateDescription;
        return instance.save();
    })
    /* Product.findByPk(id) // Alternative with 'update'
    .then(instance => {
        return instance.update({
            item: updateItem
            ...
        })
    }) */
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.destroy({where: { id: id }})
    .then((result) => {
        console.log('Deleting...', result);
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}
