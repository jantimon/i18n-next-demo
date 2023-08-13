// @ts-check
import { generateVariableName, hash, translationPrefix } from "./lib/encode.mjs";
import { TranslationPrecompiler } from "./lib/precompiler.mjs";

/**
 * Convert each dictionary word into a stand-a-lone ESM module
 * to allow webpack to cache each word independently and to add it to the correct module
 *
 * https://webpack.js.org/api/loaders/
 *
 * @this {import("webpack").LoaderContext<{languages: string[]}> & { _compiler: import("webpack").Compiler }}}
 * @param {string} source
 */
export default function i18nDictionaryLoader(source) {
  const { languages } = this.getOptions();
  // prevent direct imports
  if (!this.resourceQuery) {
    throw new Error(
      `@tools/i18n: ❌ Missing resourceQuery in translation import.`
    );
  }
  if (this.resourceQuery === "?lang") {
    return `export default ${JSON.stringify(languages)};`
  }

  const isDev = this.resourceQuery === "?dev";
  const dictionary = isDev
    ? parseDictionaryJson(source)
    : parseDictionaryJsonCached(source, this._compiler);
  const compiler = new TranslationPrecompiler(languages);

  if (this.resourceQuery === "?dev") {
    // During dev bundle size can be ignored so all words can be converted
    // to allow a smaller dependency graph during development
    for (const dictionaryKey in dictionary) {
      const translations = dictionary[dictionaryKey] || {};
      try {
        compiler.addTranslation(
          generateVariableName(translationPrefix, dictionaryKey),
          translations,
          dictionaryKey
        );
      } catch (e) {
        console.log("@tools/i18n: ❌ Invalid ICU Translation", translations, e);
      }
    }
  } else {
    // Production e.g. ?=fe50ff1937ceffe640a226af5c455c4cba8abfe1f46805cc9b0f96c522e82bbe
    const dictionaryKey = this.resourceQuery.slice(2);
    /**
     * Raw dictionary e.g.:
     * ```
     * "Item number": {
     *  "de-CH": "Artikelnummer",
     *  "en-US": "Item number",
     *  "fr-CH": "Numéro d'article",
     *  "it-CH": "No. di articolo"
     * },
     * ```
     */
    const translations = dictionary[dictionaryKey] || {};
    compiler.addTranslation("default", translations, dictionaryKey);
  }
  return compiler.toESM();
}

/**
 * Parsed translation file
 * E.g. { "Hello World": { "en-US": "Hello World", "de-CH": "Hallo Welt" } }
 * @typedef {Record<string, Record<string, string>>} IStaticTranslations
 */

/**
 * @type {WeakMap<import("webpack").Compiler, IStaticTranslations>}
 */
const translationsMemoryCache = new WeakMap();

/**
 * Reads the translation from disk
 *
 * For performance reasons the value is read only once
 * per compiler
 *
 * @param {string} source
 * @param {import("webpack").Compiler} compiler
 */
function parseDictionaryJsonCached(source, compiler) {
  const translationsFromCache = translationsMemoryCache.get(compiler);
  const translations = translationsFromCache || parseDictionaryJson(source);
  if (!translationsFromCache) {
    translationsMemoryCache.set(compiler, translations);
  }
  return translations;
}

/**
 * Reads the translation from disk and uses hashes as keys to reduce the maximum length
 *
 * This function is without cache and should not be used directly
 *
 * @param {string} source
 * @returns {IStaticTranslations}
 */
function parseDictionaryJson(source) {
  const dictionary = JSON.parse(source);
  return Object.fromEntries(
    Object.entries(dictionary).map(([translationKey, translationValues]) => [
      hash(translationKey),
      translationValues,
    ])
  );
}
