const { match } = require('telegraf-i18n');
const { menumatch, arraymatch, startmatch } = require('../utils/matcher');
const {
	session,
	logsession,
	savesession,
	clearsession,
	setproductname,
	localize,
	activeuser,
	setmenu,
	setpackage,
	end,
	allowmenu,
} = require('../middlewares');
const menu = require('../constants/menu');
const packages = require('../constants/packages');
const replies = require('../replies');

// handlers
const start = require('./start');
const language = require('./language');
const back = require('./back');
const amount = require('./amount');
const clearbasket = require('./clearbasket');
const removeitem = require('./removeitem');
const checkout = require('./checkout');
const getname = require('./getname');
const getphone = require('./getphone');
const getlocation = require('./getlocation');

// admin
const orderStatuses = require('../admin/order-statuses');
const changeOrderStatus = require('../admin/change-status');

module.exports = (bot) => {
	// ADMIN ACTIONS
	bot.action(/change_status_(.+)/, orderStatuses);
	bot.action(/status_(.+)_(.+)/, changeOrderStatus);

	bot.use(activeuser);
	bot.use(localize);
	// bot.use(logsession);
	// bot.use(clearsession);

	// general
	bot.start(start, setmenu(menu.home), savesession);

	bot.hears(match('back'), back, savesession, end);

	bot.hears(
		arraymatch(['uz', 'ru', 'en']),
		language,
		replies.home,
		setmenu(menu.home, null),
		savesession
	);

	// order
	bot.hears(
		match('order'),
		allowmenu([menu.home]),
		replies.packages,
		session({
			basket: null,
			order: null,
			product: null,
		}),
		setmenu(menu.packages),
		savesession
	);

	bot.hears(
		match('basket'),
		allowmenu([menu.packages, menu.products, menu.product]),
		replies.basket,
		setmenu(menu.basket),
		savesession
	);

	bot.hears(
		menumatch(menu.askname),
		getname,
		replies.askphone,
		setmenu(menu.askphone, menu.last),
		savesession
	);

	bot.hears(
		match('checkout'),
		allowmenu([menu.packages, menu.products, menu.basket]),
		setmenu(menu.askname),
		checkout,
		savesession
	);

	bot.on(
		'contact',
		allowmenu([menu.askphone]),
		getphone,
		replies.asklocation,
		setmenu(menu.asklocation, menu.last),
		savesession
	);

	bot.on(
		'location',
		allowmenu([menu.asklocation]),
		getlocation,
		replies.confirmlocation,
		savesession
	);

	bot.hears(
		match('confirm_location_button'),
		allowmenu([menu.asklocation]),
		replies.confirmorder,
		savesession
	);

	bot.hears(
		match('cancel_order_button'),
		clearbasket,
		replies.packages,
		setmenu(menu.packages, menu.home),
		savesession
	);

	bot.hears(
		match('confirm_order_button'),
		replies.orderdone,
		replies.home,
		session({
			basket: null,
			order: null,
			product: null,
		}),
		setmenu(menu.home, null),
		savesession
	);

	bot.hears(
		startmatch('remove_item'),
		allowmenu([menu.basket]),
		removeitem,
		savesession
	);

	bot.hears(
		match('clear_basket'),
		allowmenu([menu.basket]),
		clearbasket,
		replies.packages,
		setmenu(menu.packages, menu.home),
		savesession
	);

	bot.hears(
		arraymatch(Object.values(packages)),
		allowmenu([menu.packages]),
		setpackage,
		replies.products,
		setmenu(menu.products),
		savesession,
		end
	);

	bot.hears(
		menumatch(menu.products),
		setproductname,
		replies.product,
		setmenu(menu.product),
		savesession
	);

	bot.hears(
		menumatch(menu.product),
		amount,
		replies.products,
		setmenu(menu.products, menu.packages),
		savesession,
		end
	);

	// information
	bot.hears(match('info'), allowmenu([menu.home]), replies.info, savesession);

	// settings
	bot.hears(
		match('settings'),
		allowmenu([menu.home]),
		replies.settings,
		setmenu(menu.settings),
		savesession
	);

	bot.command(
		'/settings',
		replies.settings,
		setmenu(menu.settings, menu.home),
		savesession
	);

	bot.hears(
		match('change_lang'),
		allowmenu([menu.settings]),
		replies.languages
	);

	// feedback
	bot.hears(
		match('feedback'),
		allowmenu([menu.home]),
		replies.feedback,
		setmenu(menu.feedback),
		savesession,
		end
	);

	bot.hears(
		menumatch(menu.feedback),
		replies.thanksforfeedback,
		replies.home,
		setmenu(menu.home, null),
		savesession
	);

	// change name
	bot.hears(
		match('change_name'),
		allowmenu([menu.settings]),
		replies.askname,
		setmenu(menu.change_name),
		savesession,
		end
	);

	bot.hears(
		menumatch(menu.change_name),
		getname,
		replies.home,
		setmenu(menu.home, null),
		savesession
	);
};
