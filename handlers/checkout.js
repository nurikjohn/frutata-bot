const menu = require('../constants/menu');
const replies = require('../replies');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (ctx, next) => {
    const { session, reply, i18n } = ctx;

    if (!(session.basket && session.basket.length))
        return reply(i18n.t('empty_basket'));

    if (!session.user.name) {
        ctx.session.menu.current = menu.askname;
        return replies.askname(ctx, next);
    } else if (!session.user.phone) {
        ctx.session.menu.current = menu.askphone;
        return replies.askphone(ctx, next);
    } else {
        ctx.session.menu.current = menu.asklocation;
        return replies.asklocation(ctx, next);
    }
});
