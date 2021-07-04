const keyboard = require('../keyboards');

module.exports = async (ctx, next) => {
    const { reply, i18n } = ctx;

    reply(i18n.t('main_menu'), keyboard.home(i18n));

    next();
};
