const { Users } = require('../services/api');
const menu = require('../constants/menu');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (ctx, next) => {
    const {
        session,
        message: { text },
    } = ctx;

    const user = await Users.update(session.user._id, {
        name: text,
    });

    console.log(user);

    ctx.session.user = user;

    next();
});
