const { Orders } = require('../services/api');
const keyboard = require('../keyboards');
const { newOrder } = require('../utils/lazy');
const catchAsync = require('../utils/catchAsync');

require('dotenv').config();

const group_id = process.env.GROUP_ID;

module.exports = catchAsync(async (ctx, next) => {
    const {
        answerCbQuery,
        editMessageText,
        i18n,
        match: [_, id, sts],
    } = ctx;

    answerCbQuery();

    const order = await Orders.status(id, sts);

    const {
        user: { name, phone },
        status,
        location: { address, latitude, longitude },
        products,
        _id,
    } = order;

    i18n.locale('ru');

    editMessageText(
        i18n.t('new_order', {
            name,
            phone,
            address,
            id,
            status: i18n.t(status),
            check: newOrder(i18n, products),
        }),
        keyboard.orderActions(
            i18n,
            id,
            i18n.t('location_url', {
                latitude,
                longitude,
            })
        )
    );
});
