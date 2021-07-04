const Markup = require('telegraf/markup');

module.exports = (i18n) =>
    Markup.keyboard([
        [i18n.t('order')],
        [i18n.t('feedback'), i18n.t('info')],
        [i18n.t('settings')],
    ])
        .resize()
        .extra();
