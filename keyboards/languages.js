const Extra = require('telegraf/extra');

module.exports = (i18n) =>
    Extra.markup((markup) => {
        let buttons = [[i18n.t('uz')], [i18n.t('ru')]];

        return markup.keyboard(buttons).resize();
    });
