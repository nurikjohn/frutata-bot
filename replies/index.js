const home = require('./home');
const settings = require('./settings');
const languages = require('./languages');
const packages = require('./packages');
const products = require('./products');
const product = require('./product');
const basket = require('./basket');
const askname = require('./askname');
const askphone = require('./askphone');
const asklocation = require('./asklocation');
const confirmlocation = require('./confirmlocation');
const confirmorder = require('./confirmorder');
const orderdone = require('./orderdone');
const feedback = require('./feedback');
const info = require('./info');
const thanksforfeedback = require('./thanksforfeedback');
const catchAsync = require('../utils/catchAsync');

module.exports = {
    home: catchAsync(home),
    settings: catchAsync(settings),
    languages: catchAsync(languages),
    packages: catchAsync(packages),
    products: catchAsync(products),
    product: catchAsync(product),
    basket: catchAsync(basket),
    askname: catchAsync(askname),
    askphone: catchAsync(askphone),
    asklocation: catchAsync(asklocation),
    confirmorder: catchAsync(confirmorder),
    confirmlocation: catchAsync(confirmlocation),
    orderdone: catchAsync(orderdone),
    feedback: catchAsync(feedback),
    thanksforfeedback: catchAsync(thanksforfeedback),
    info: catchAsync(info),
};
