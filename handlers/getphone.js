const { Users } = require('../services/api');
const menu = require('../constants/menu');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (ctx, next) => {
    const {
        session,
        message: {
            contact: { phone_number },
        },
    } = ctx;

    const user = await Users.update(session.user._id, {
        phone: phone_number,
    });

    ctx.session.user = user;

    next();
});
