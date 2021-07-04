const { home } = require('../keyboards');
const { Users } = require('../services/api');
const redis = require('../services/redis');
const catchAsync = require('../utils/catchAsync');
const menus = require('../constants/menu');

exports.localize = ({ session, i18n }, next) => {
    const locale = (session.user && session.user.language) || 'ru';
    i18n.locale(locale);
    next();
};

exports.activeuser = catchAsync(async (ctx, next) => {
    const {
        message: {
            from: { id },
        },
        session,
    } = ctx;

    if (!session.user) {
        console.log('MAKING REQUEST!!!');
        const data = await Users.get(id);
        if (data && data.length) {
            ctx.session.user = data[0];
        }
    }

    next();
});

exports.setmenu = (newcurrent, newback) => (ctx, next) => {
    const {
        session: { menu },
    } = ctx;

    const oldmenu = menu || { current: null };

    ctx.session.menu = {
        current: newcurrent,
        back: newback == menus.last ? oldmenu.back : newback || oldmenu.current,
    };

    next();
};

exports.session = (newSession) => (ctx, next) => {
    Object.keys(newSession).map((key) => {
        ctx.session[key] = newSession[key];
    });

    next();
};

exports.setpackage = (ctx, next) => {
    const {
        match: [_, package],
    } = ctx;

    ctx.session.package = package;
    next();
};

exports.setproductname = (ctx, next) => {
    const {
        match: [name],
    } = ctx;

    ctx.session.productname = name;
    next();
};

exports.clearsession = (ctx, next) => {
    ctx.session = {};
    next();
};

exports.logsession = (ctx, next) => {
    console.log(ctx.session);
    next();
};

exports.savesession = catchAsync(async (ctx, next) => {
    await redis.saveSession(redis.options.getSessionKey(ctx), ctx.session);

    next();
});

exports.allowmenu = (menu) => (ctx, next) => {
    if (ctx.session.menu && menu.includes(ctx.session.menu.current))
        return next();
};

exports.end = () => {};
