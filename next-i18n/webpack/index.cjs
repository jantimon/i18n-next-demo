/// @ts-check
module.exports = class I18nPlugin {
  /**
   * @param {{languages: string[]}} options - e.g. { languages: [ "de-CH", "en-US"] }
   */
  constructor(options) {
    this.options = options;
    if (!options || typeof options !== "object" || !options.languages || !Array.isArray(options.languages)) {
      throw new Error(
        `@tools/i18n: ❌ Missing languages option. e.g. { languages: [ "de-CH", "en-US"] }`
      );
    }
  }
  /**
   * hook into webpack compiler
   * @param {import("webpack").Compiler} compiler
   */
  async apply(compiler) {
    // Register Loader
    compiler.options.module.rules.push(
      // Loader to process the dictionary
      {
        test: /dictionary.i18n$/,
        loader: require.resolve("./dictionary.loader.mjs"),
        options: this.options
      }
    );
  }
}
