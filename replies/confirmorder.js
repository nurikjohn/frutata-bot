const keyboard = require('../keyboards');
const { generateCheck } = require('../utils/lazy');

module.exports = async (ctx, next) => {
    const {
        reply,
        i18n,
        session: {
            basket,
            user: { name, phone },
            order: {
                location: { address },
            },
        },
    } = ctx;

    reply(
        i18n.t('confirm_order', {
            name,
            phone,
            address,
            check: generateCheck(i18n, basket),
        }),
        keyboard.confirmorder(i18n)
    );

    next();
};
