const { knex } = require('../config/bookshelf');
const Order = require('../models/order');

exports.getAll = (req, res) => {
    Order.getAll().then(
        function(allOrders) {
            res.json(allOrders);
        }
    )
};

exports.store = (req, res) => {
    const newOrder = Order.create({
        'order_date': req.body.order_date,
        'status_id': req.body.status_id,
        'user_name': req.body.user_name,
        'email': req.body.email,
        'phone_number': req.body.phone_number
    }).then(function() {
        res.json({
            'status':'saved!',
            'product': newOrder,
        });
    }).catch((error) => {
        console.log('Error : ', error.message);
        res.send(error);
    });
 };

 exports.updateStatusById = (req, res) => {
    Order.update(req.params.id, req.params.stan).then(
        function(order) {
            res.json(order);
        }
    )
 };

exports.getOrders = (req, res) => {
    knex.select().from('orders').where('status_id', req.params.status).then(
        function(orders) {
            res.json(orders);
    })
}
