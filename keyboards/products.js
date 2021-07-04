const Extra = require('telegraf/extra');
const { matrix } = require('../utils/lazy');

module.exports = (i18n, products) =>
    Extra.markup((markup) => {
        let buttons = [[i18n.t('basket'), i18n.t('checkout')]];

        matrix(products, 2).map((group) => {
            buttons.push(
                group.map((product) => product[`name_${i18n.locale()}`])
            );
        });

        buttons.push([i18n.t('back')]);

        return markup.keyboard(buttons).resize();
    });
