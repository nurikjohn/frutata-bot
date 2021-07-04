const keyboard = require('../keyboards');
const { generateCheck } = require('../utils/lazy');

module.exports = async (ctx, next) => {
    const {
        session: { basket },
        reply,
        i18n,
    } = ctx;

    if (basket && basket.length)
        reply(generateCheck(i18n, basket), keyboard.basket(i18n, basket));
    else return reply(i18n.t('empty_basket'));

    next();
};
