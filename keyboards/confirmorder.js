const Markup = require('telegraf/markup');

module.exports = (i18n) =>
    Markup.keyboard([
        [i18n.t('confirm_order_button')],
        [i18n.t('cancel_order_button')],
    ])
        .resize()
        .extra();
