const keyboard = require('../keyboards');

module.exports = async (ctx, next) => {
    const { reply, i18n } = ctx;

    reply(i18n.t('askname'), keyboard.back(i18n));

    next();
};
