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

exports.put = (req, res) => {
    let product_id = req.params.id;
    let product = req.body.product;
    if (!product_id || !product) {
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

exports.getPlotValue = (req, res) => {
    let product_id = req.params.id;
    let plot_values = req.params.plotValues;
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide product id' });
    }

    if (!plot_values) {
        return res.status(400).send({ error: true, message: 'Please provide the number of plots' });
    }
    dbConn.query('SELECT product.price, product_category.name FROM product, product_category WHERE product.id = ? AND product.id_product_category = product_category.id', product_id, function (error, results, fields) {
        if (error) throw error;

        var result = 0;
        switch (results[0].name) {
            case 'Informática':
                result = results[0].price * (5 / 100) / (1 - Math.pow(1 + (5 / 100), -plot_values));
                break;
            case 'Automotivo':
                result = results[0].price * (2.5 / 100) / (1 - Math.pow(1 + (2.5 / 100), -plot_values));
                break;
            case 'Móveis':
                result = results[0].price * (1 / 100) / (1 - Math.pow(1 + (1 / 100), -plot_values));
                break;
            default:
                result = results[0].price * (10 / 100) / (1 - Math.pow(1 + (10 / 100), -plot_values));
        }
        console.log(results[0]);
        res.send({ error: false, data: result.toFixed(2), message: 'Result of plot values of product.' });
    });
};