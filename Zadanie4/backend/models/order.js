//order.js
const bookshelf = require('../config/bookshelf');
const _ = require('underscore');
const knex = require('knex')

const Order = bookshelf.Model.extend({
   tableName: 'orders'
})

module.exports.getAll = () => {
    return Order.fetchAll();
};

module.exports.create = (order) => {
    return new Order({
        order_date: order.order_date,
        status_id: order.status_id,
        user_name: order.user_name,
        email: order.email,
        phone_number: order.phone_number
    }).save();
};

module.exports.update = (id, status_id) => {
    return new Order({
        id: id
    }).save({
        status_id: status_id,
        },
        {path: true}
    )
};


