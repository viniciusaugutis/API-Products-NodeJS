var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'productsSupermarket'
});

dbConn.connect();

exports.get = (req, res) => {
    dbConn.query('SELECT * FROM product', function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Products list' });
    })
};

exports.post = (req, res) => {
    var body_request = req.body.product;
    if (!body_request) {
        res.status(400).send({ error: true, message: 'Please provide Product' });
    }
    dbConn.query("INSERT INTO product(name, description, price, id_product_category) VALUES (?, ?, ? , ?) ", [body_request.name, body_request.description, body_request.price, body_request.id_product_category], function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'New product has been created.' });
    });
};

exports.put =  (req, res) => {
    let product_id = req.params.id;
    let product = req.body.product;
    if (!product_id|| !product) {
        return res.status(400).send({ error: product, message: 'Please provide produt and one id to update' });
    }
    dbConn.query("UPDATE product SET name = ?, description = ?, price = ?, id_product_category = ? WHERE id = ?", [product.name, product.description, product.price, product.id_product_category, product_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Product has been updated successfully.' });
    });
};

exports.delete = (req, res) => {
    let product_id = req.params.id;
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide product id' });
    }
    dbConn.query('DELETE FROM product WHERE id = ?', [product_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Product has been removed successfully.' });
    });
};