const Markup = require('telegraf/markup');

module.exports = (i18n, id, location) => {
    let buttons = [[Markup.urlButton(i18n.t('address'), location)]];

    return Markup.inlineKeyboard(buttons).resize().extra();
};
