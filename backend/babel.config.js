module.exports = function (api) {

    api.cache(true);

    const presets = [
        [
            '@babel/preset-typescript',
            {
                targets: {
                    node: 'current',
                },
                sourceType: 'module'
            },
        ],
    ];
    const plugins = [];

    return {
        presets,
        plugins
    };
};