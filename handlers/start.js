const replies = require('../replies');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (ctx, next) => {
    const { session } = ctx;

    if (session.user) replies.home(ctx, next);
    else replies.languages(ctx, next);
});
