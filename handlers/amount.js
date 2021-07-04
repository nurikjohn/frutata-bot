const packages = require('../constants/packages');
const catchAsync = require('../utils/catchAsync');
const { isNumeric } = require('../utils/validator');

module.exports = catchAsync(async (ctx, next) => {
    const {
        session,
        message: { text },
        reply,
        i18n,
    } = ctx;

    let amount;

    const txt = text.replace(i18n.t('gramm'), '');

    if (session.package === packages.pouch)
        amount = parseInt(txt / session.product?.weight || 100);
    else amount = parseInt(txt);

    if (!isNumeric(txt) || amount < 1) return;

    let product = {
        ...session.product,
        amount,
    };

    ctx.session.basket = session.basket || [];
    ctx.session.justAddedToCart = true;

    const allreadyhas = session.basket.find(
        (prod) => prod._id === product._id && prod.package === product.package
    );

    if (allreadyhas) {
        ctx.session.basket.map(
            (prod) =>
                prod._id === allreadyhas._id &&
                prod.package === allreadyhas.package &&
                (allreadyhas.amount += amount)
        );
    } else {
        ctx.session.basket.push(product);
    }

    next();
});
