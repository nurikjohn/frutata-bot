const keyboard = require('../keyboards');
const { Settings } = require('../services/api');

module.exports = async (ctx, next) => {
    const { reply, i18n } = ctx;

    const { information } = await Settings.get();

    reply(information[i18n.locale()], { parse_mode: 'markdown' });

    next();
};
