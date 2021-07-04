const keyboard = require('../keyboards');
const catchAsync = require('../utils/catchAsync');
const { newOrder } = require('../utils/lazy');
require('dotenv').config();
const group_id = process.env.GROUP_ID;

module.exports = catchAsync(async (ctx, order) => {
    const { telegram, i18n, session } = ctx;

    const {
        user: { name, phone },
        status,
        location: { address, latitude, longitude },
        products,
        _id,
    } = order;

    i18n.locale('ru');

    telegram.sendMessage(
        group_id,
        i18n.t('new_order', {
            name,
            phone,
            address,
            id: _id,
            status: i18n.t(status),
            check: newOrder(i18n, products),
        }),
        keyboard.orderActions(
            i18n,
            _id,
            i18n.t('location_url', { latitude, longitude })
        )
    );

    i18n.locale(session.user.language);
});
