const keyboard = require('../keyboards');
const feedback = require('../admin/new-feedback');

module.exports = async (ctx, next) => {
    const { reply, i18n } = ctx;

    reply(i18n.t('thanks_for_feedback'));

    next();

    feedback(ctx);
};
