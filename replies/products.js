const { Products } = require('../services/api');
const keyboard = require('../keyboards');

module.exports = async (ctx, next) => {
    const {
        reply,
        i18n,
        session: {
            user: { language },
            package,
            basket,
            justAddedToCart,
        },
    } = ctx;

    const products = await Products.getByPackage(package);

    reply(
        justAddedToCart ? i18n.t('continue') : i18n.t('choose_product'),
        keyboard.products(i18n, products, language)
    );

    ctx.session.justAddedToCart = false;

    next();
};
