const Extra = require('telegraf/extra');

module.exports = (i18n) =>
    Extra.markup((markup) =>
        markup
            .keyboard([
                [markup.locationRequestButton(i18n.t('location_button'))],
                [i18n.t('back')],
            ])
            .resize()
    );
