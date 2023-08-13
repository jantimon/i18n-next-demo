// @ts-ignore - will be handled by the loader
import lang from "./dictionary.i18n?lang";

/** 
 * @param {string} language
 */
export const useTranslate = (language) => {
    const index = lang.indexOf(language);
    return {
        /**
         * Returns the translated text
         * 
         * @param {string} key 
         * @param {Record<string, string | number>} args 
         * @returns {string}
         */
        __: (key, args = {}) => {
            const translation = Array.isArray(key) ? key[index] : key;
            return typeof translation === "function" ? translation(args) : translation;
        }
    };
}