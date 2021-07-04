const Extra = require('telegraf/extra');

module.exports = (i18n) =>
    Extra.markup((markup) => {
        let buttons = [
            [i18n.t('basket'), i18n.t('checkout')],
            [i18n.t('pack')],
            [i18n.t('jar'), i18n.t('pouch')],
            [i18n.t('back')],
        ];

        return markup.keyboard(buttons).resize();
    });
