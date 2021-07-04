const { Products } = require('../services/api');
const keyboard = require('../keyboards');
const { generateCaption } = require('../utils/lazy');
const packages = require('../constants/packages');

module.exports = async (ctx, next) => {
    const {
        replyWithPhoto,
        reply,
        i18n,
        session: { user, package, productname },
    } = ctx;

    const [product] = await Products.getByName(
        productname,
        user.language,
        package
    );

    if (product) {
        const { price, image } = product;

        const caption = generateCaption(
            i18n,
            product,
            price,
            user.language,
            package === packages.pouch
        );

        ctx.session.product = product;

        replyWithPhoto(image.url, keyboard.product(i18n, package, caption));
        reply(i18n.t('choose_amount'), { parse_mode: 'markdown' });
        next();
    }
};
