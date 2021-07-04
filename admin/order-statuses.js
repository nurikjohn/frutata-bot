const keyboard = require('../keyboards');
const catchAsync = require('../utils/catchAsync');
const { newOrder } = require('../utils/lazy');
require('dotenv').config();

const group_id = process.env.GROUP_ID;

module.exports = catchAsync(async (ctx, next) => {
    const {
        answerCbQuery,
        editMessageText,
        callbackQuery: {
            message: { text },
        },
        i18n,
        match: [_, id],
    } = ctx;

    answerCbQuery();

    i18n.locale('ru');

    editMessageText(text, keyboard.orderStatuses(i18n, id));
});
