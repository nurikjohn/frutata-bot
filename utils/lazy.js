const packages = require('../constants/packages');

exports.generateCheck = (i18n, basket) => {
    const language = i18n.locale();

    let total = 0;

    return `${i18n.t('basket')}:
${basket.map((product) => {
    const price = product.price * product.amount;
    total += price;

    if (product.package === packages.pouch)
        return `
${product[`name_${language}`]} - ${i18n.t(product.package)}
${product.amount * product.weight}${i18n.t('gramm')} x ${
            product.price
        } = ${price} ${i18n.t('price_currency')}`;
    else
        return `
${product[`name_${language}`]} - ${i18n.t(product.package)}
${product.amount} x ${product.price} = ${price} ${i18n.t('price_currency')}`;
}).join(`
`)}

${i18n.t('total_price', { total })}
`;
};

exports.generateCaption = (i18n, product, price, language, pouch) => {
    const name = product[`name_${language}`];
    const description = product[`description_${language}`];

    return `${name}

${description}
    
${i18n.t('price', { price })}${
        pouch ? ` / ${product?.weight}${i18n.t('gramm')}` : ''
    }`;
};

exports.newOrder = (i18n, products) => {
    const language = i18n.locale();

    let total = 0;

    return `${i18n.t('basket')}:
${products.map(({ product, amount }) => {
    const price = product.price * amount;
    total += price;

    if (product.package === packages.pouch)
        return `
${product[`name_${language}`]} - ${i18n.t(product.package)}
${amount * product?.weight || 100}${i18n.t('gramm')} x ${
            product.price
        } = ${price} ${i18n.t('price_currency')}`;
    else
        return `
${product[`name_${language}`]} - ${i18n.t(product.package)}
${amount} x ${product.price} = ${price} ${i18n.t('price_currency')}`;
}).join(`
`)}

${i18n.t('total_price', { total })}
`;
};

exports.matrix = (array, size = 2) => {
    const newArray = [];

    while (array.length > 0) newArray.push(array.splice(0, size));

    return newArray;
};
