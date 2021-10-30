const menu = require('../constants/menu');
const replies = require('../replies');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (ctx, next) => {
	const { session } = ctx;

	switch (session.menu.back) {
		case menu.home: {
			ctx.session.menu = {
				current: menu.home,
				back: null,
			};
			return replies.home(ctx, next);
		}

		case menu.packages: {
			ctx.session.menu = {
				current: menu.packages,
				back: menu.home,
			};
			return replies.packages(ctx, next);
		}

		case menu.products: {
			ctx.session.menu = {
				current: menu.products,
				back: menu.packages,
			};
			return replies.products(ctx, next);
		}

		case menu.product: {
			ctx.session.menu = {
				current: menu.product,
				back: menu.products,
			};
			return replies.product(ctx, next);
		}

		case menu.settings: {
			ctx.session.menu = {
				current: menu.settings,
				back: menu.home,
			};
			return replies.settings(ctx, next);
		}

		case menu.basket: {
			ctx.session.menu = {
				current: menu.basket,
				back: menu.home,
			};
			return replies.basket(ctx, next);
		}
	}
});
