const Markup = require('telegraf/markup');

module.exports = (i18n) =>
    Markup.keyboard([
        [i18n.t('change_lang')],
        [i18n.t('change_name')],
        [i18n.t('back')],
    ])
        .resize()
        .extra();
