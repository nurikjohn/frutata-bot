module.exports = (fn) => {
    return (ctx, next) => {
        fn(ctx, next).catch(console.log);
    };
};
