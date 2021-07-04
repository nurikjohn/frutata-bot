const Extra = require('telegraf/extra');

module.exports = (i18n) =>
    Extra.markup((markup) =>
        markup
            .keyboard([
                [i18n.t('confirm_location_button')],
                [markup.locationRequestButton(i18n.t('location_resend'))],
                [i18n.t('back')],
            ])
            .resize()
    );
