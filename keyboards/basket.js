const Extra = require('telegraf/extra');

module.exports = (i18n, basket) =>
    Extra.markup((markup) => {
        const language = i18n.locale();
        let buttons = [[i18n.t('checkout')]];

        buttons.push([i18n.t('back'), i18n.t('clear_basket')]);

        basket.map((product) =>
            buttons.push([
                i18n.t('remove_item', {
                    product: `${product[`name_${language}`]} - ${i18n.t(
                        product.package
                    )}`,
                }),
            ])
        );

        return markup.keyboard(buttons).resize();
    });
