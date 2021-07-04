const catchAsync = require('../utils/catchAsync');

require('dotenv').config();

const group_id = process.env.GROUP_ID;

module.exports = catchAsync(async (ctx) => {
    const {
        telegram,
        i18n,
        session,
        message: {
            text,
            from: { id, first_name },
        },
    } = ctx;

    i18n.locale('ru');

    telegram.sendMessage(
        group_id,
        i18n.t('new_feedback', {
            id,
            first_name,
            text,
        }),
        {
            parse_mode: 'HTML',
        }
    );

    i18n.locale(session.user.language);
});
