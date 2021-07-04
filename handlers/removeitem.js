const replies = require('../replies');
const menu = require('../constants/menu');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (ctx, next) => {
    const {
        session: { basket },
        match: [text],
        i18n,
    } = ctx;

    const newBasket = basket.filter(
        (prod) =>
            i18n.t('remove_item', {
                product: `${prod[`name_${i18n.locale()}`]} - ${i18n.t(
                    prod.package
                )}`,
            }) !== text
    );

    ctx.session.basket = newBasket;

    if (newBasket.length) replies.basket(ctx, next);
    else {
        ctx.session.menu = {
            current: menu.packages,
            back: menu.home,
        };

        replies.packages(ctx, next);
    }
});
