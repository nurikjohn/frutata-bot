const { Orders } = require('../services/api');
const newOrder = require('../admin/new-order');

module.exports = async (ctx, next) => {
    const { session, reply, i18n } = ctx;

    let total = 0;
    session.basket.map(({ price, amount }) => {
        total += price * amount;
    });

    const order = {
        user: session.user._id,
        location: session.order.location,
        products: session.basket.map(({ _id, package, amount }) => ({
            product: _id,
            package,
            amount,
        })),
        status: 'new',
        total,
    };

    const res = await Orders.create(order);

    if (res) {
        reply(i18n.t('order_done'));
        newOrder(ctx, res);
    } else reply(i18n.t('order_failed'));

    next();
};
