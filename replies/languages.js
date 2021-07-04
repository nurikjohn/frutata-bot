const keyboard = require('../keyboards');

module.exports = async (ctx, next) => {
    const { reply, i18n } = ctx;

    reply(i18n.t('choose_lang'), keyboard.languages(i18n));

    next();
};
