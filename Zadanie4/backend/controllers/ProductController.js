// const products = require('../data/ProductData');
// const _ = require('underscore');
const Product = require('../models/product');

exports.getAll = (req, res) => {
    Product.getAll().then(
        function(allProducts) {
            res.json(allProducts);
        }
    );
    //res.json(products);
 };
 
 exports.getById = (req, res) => {
    Product.getById(req.params.id).then(
        function(product) {
            res.json(product);
        }
    ).catch((error) => {
        console.log('Empty response', error.message);
        res.send(error);
    })
    //res.json(_.find(products,function(product) { return product.id == req.params.id}));
 };
 
 exports.store = (req, res) => {
    const newProduct = Product.create({
        'product_name': req.body.product_name,
        'description': req.body.description,
        'price': req.body.price,
        'weight': req.body.weight,
        'category_id': req.body.category_id
    }).then(function() {
        res.json({
            'status':'saved!',
            'product': newProduct,
        });
    }).catch((error) => {
        console.log('Error : ', error.message);
        res.send(error);
    });
    // products.push(newProduct);
 };
 
 exports.updateById = (req, res) => {
    // Please note the API change!
    Product.update(req.body).then(
        function(product) {
            res.json(product);
        }
    ).catch((error) => {
        console.log('Error : ', error.message);
        res.send(error);
    })
    // const currentProduct = _.find(products,function(product) { return product.id == req.params.id});
    // currentProduct.name = req.body.name;
    // currentProduct.description = req.body.description;
    // currentProduct.price = req.body.price;
    // currentProduct.amount = req.body.amount;
    // res.json({'updatedProduct':currentProduct});
 }