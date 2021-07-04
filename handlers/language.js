const { Users } = require('../services/api');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (ctx, next) => {
    const {
        match: [_, language],
        message: {
            from: { id },
        },
        i18n,
    } = ctx;

    if (!ctx.session.user) {
        const data = await Users.create({
            userId: id,
            language,
        });
        if (data) {
            ctx.session.user = data[0];
        }
        i18n.locale(language);
    } else {
        const data = await Users.update(ctx.session.user._id, {
            language,
        });

        if (data) {
            ctx.session.user = data[0];
        }

        i18n.locale(language);
    }

    next();
});
