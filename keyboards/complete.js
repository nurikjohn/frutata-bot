const Markup = require('telegraf/markup');

module.exports = (i18n) =>
  Markup.keyboard([[i18n.t('confirm')], [i18n.t('cancel')]])
    .resize()
    .extra();
