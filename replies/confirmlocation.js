const keyboard = require('../keyboards');
const { generateCheck } = require('../utils/lazy');

module.exports = async (ctx, next) => {
    const {
        reply,
        i18n,
        session: {
            order: {
                location: { address },
            },
        },
    } = ctx;

    reply(
        i18n.t('confirm_location', {
            address,
        }),
        keyboard.confirmlocation(i18n)
    );

    next();
};
