const path = require("path");
const fs = require('fs');

const rootDir = require("../util/path");

const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProducts = (req, res, next) => {
  console.log(req.body);
  const product = new Product(req.body.title);
  fs.writeFileSync('products.json', JSON.stringify(product));
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  console.log(products);
  fs.readFileSync('products.json');
  res.sendFile(path.join(rootDir, "views", "shop.html"));
};
