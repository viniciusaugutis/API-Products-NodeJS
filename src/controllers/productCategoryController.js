var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'productsSupermarket'
});

dbConn.connect();

exports.get = (req, res) => {
    dbConn.query('SELECT * FROM product_category', function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Product Categories list' });
    });
};

exports.post = (req, res) => {
    var body_request = req.body.product_category;
    if (!body_request) {
        res.status(400).send({ error: true, message: 'Please provide Product Category' });
    }
    dbConn.query("INSERT INTO product_category SET ? ", { name: body_request.name }, function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'New product category has been created.' });
    });
};

exports.put =  (req, res) => {
    let product_category_id = req.params.id;
    let product_category = req.body.product_category;
    if (!product_category_id || !product_category) {
        return res.status(400).send({ error: product_category, message: 'Please provide product category and one id to update' });
    }
    dbConn.query("UPDATE product_category SET name = ? WHERE id = ?", [product_category.name, product_category_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Product category has been updated successfully.' });
    });
};

exports.delete = (req, res) => {
    let product_category_id = req.params.id;
    if (!product_category_id) {
        return res.status(400).send({ error: true, message: 'Please provide product category id' });
    }
    dbConn.query('DELETE FROM product_category WHERE id = ?', [product_category_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Product category has been removed successfully.' });
    });
};