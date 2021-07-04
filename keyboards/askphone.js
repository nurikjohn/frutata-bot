const Extra = require('telegraf/extra');

module.exports = (i18n) =>
    Extra.markup((markup) =>
        markup
            .keyboard([
                [markup.contactRequestButton(i18n.t('phone_button'))],
                [i18n.t('back')],
            ])
            .resize()
    );
