const Markup = require('telegraf/markup');

module.exports = (i18n) =>
    Markup.keyboard([[i18n.t('back')]])
        .resize()
        .extra({ parse_mode: 'markdown' });
