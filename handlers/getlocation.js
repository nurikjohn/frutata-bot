const Geocode = require('../services/geocode');
const menu = require('../constants/menu');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (ctx, next) => {
    const {
        session,
        message: { location },
        i18n,
    } = ctx;

    const { address, display_name } = await Geocode.get(
        location,
        i18n.locale()
    );

    ctx.session.order = {
        location: {
            address: display_name.replace(
                `${address.district}, ${address.postcode}, `,
                ''
            ),
            ...location,
        },
    };

    next();
});
