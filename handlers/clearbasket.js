const replies = require('../replies');
const catchAsync = require('../utils/catchAsync');
const { isNumeric } = require('../utils/validator');

module.exports = catchAsync(async (ctx, next) => {
    ctx.session.basket = [];

    next();
});
