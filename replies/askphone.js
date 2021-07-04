const keyboard = require('../keyboards');

module.exports = async (ctx, next) => {
    const { reply, i18n } = ctx;

    reply(i18n.t('askphone'), keyboard.askphone(i18n));

    next();
};
