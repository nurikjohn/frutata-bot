const Extra = require('telegraf/extra');
const packages = require('../constants/packages');

module.exports = (i18n, package, caption) =>
    Extra.markup((markup) => {
        let buttons;

        if (package === packages.pouch)
            buttons = [
                [`200${i18n.t('gramm')}`, `300${i18n.t('gramm')}`],
                [`500${i18n.t('gramm')}`, `1000${i18n.t('gramm')}`],
                [`2000${i18n.t('gramm')}`],
            ];
        else
            buttons = [
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
            ];

        buttons.push([i18n.t('back'), i18n.t('basket')]);

        return markup.keyboard(buttons).resize();
    }).caption(caption);
