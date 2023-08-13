const path = require("path");

module.exports = {
  webpack: (config) => {
    const I18nPlugin = require("next-i18n/webpack/index.cjs");
    config.plugins.push(new I18nPlugin({
        languages: ["de-CH", "en-US"],
    }));
    return config;
  },
  experimental: {
    swcPlugins: [
      [
        require.resolve("@galaxus/swc-plugin-translation-importer"),
        {
          translationCache: path.resolve(__dirname, "dictionary.i18n"),
        },
      ],
    ],
  },
};
