const Markup = require('telegraf/markup');
const statuses = require('../constants/statuses');

module.exports = (i18n, id) => {
    let buttons = [];

    Object.keys(statuses).map((status) =>
        buttons.push([
            Markup.callbackButton(i18n.t(status), `status_${id}_${status}`),
        ])
    );

    return Markup.inlineKeyboard(buttons).resize().extra();
};
