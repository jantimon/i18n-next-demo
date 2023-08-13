/// @ts-check
import MessageFormat from "@messageformat/core";
import Compiler from "@messageformat/core/lib/compiler.js";

export class TranslationPrecompiler {
  /** @type {string[]} */
  compiledTranslations;
  /** @type {string[]} */
  languages;
  /** @type {Compiler} */
  compiler;
  /** @type {MessageFormat} */
  messageFormat;

  /**
   * @param {string[]} languages
   */
  constructor(languages) {
    this.compiledTranslations = [];
    this.languages = languages;
    this.messageFormat = new MessageFormat(languages);
    this.compiler = new Compiler(this.messageFormat.options);
  }

  /**
   * @param {string} exportName - The ESM export name
   * @param {Record<string, string>} translationMap - e.g. { "en-US": "Hello World", "de-CH": "Hallo Welt" }
   * @param {string} fallback - Fallback if no translation was found for a given language
   */
  addTranslation(exportName, translationMap, fallback) {
    const localMap = getAvailableLocals(this.messageFormat);
    const translationTemplates = this.languages.map((language) => ({
      translation: translationMap[language] || fallback,
      containsICU: (translationMap[language] || "").indexOf("{") !== -1,
      language,
    }));
    const compiledMessages = translationTemplates.map(
      ({ translation, containsICU, language }) => {
        if (!containsICU) {
          return JSON.stringify(translation);
        }
        return this.compiler.compile(
          translation,
          this.messageFormat.plurals[this.languages.indexOf(language)],
          localMap
        );
      }
    );
    this.compiledTranslations.push(
      `export ${
        exportName === "default" ? "default" : `const ${exportName} =`
      } ([${compiledMessages.join(", ")}]);`
    );
  }

  toESM() {
    return (
      stringifyRuntime(this.compiler.runtime) +
      "\n" +
      this.compiledTranslations.join("\n")
    );
  }
}

/**
 * Copied from: https://github.com/messageformat/messageformat/blob/7c0ea87b1501925b8c1b6734ee0e3a59c25063d4/packages/core/src/compile-module.ts#L25
 * @param {import("@messageformat/core/lib/compiler").RuntimeMap} runtime
 */
function stringifyRuntime(runtime) {
  /** @type {Record<string, string[]>} */
  const imports = {};
  /** @type {Record<string, string>} */
  const vars = {};

  for (const [name, fn] of Object.entries(runtime)) {
    if (fn.module) {
      const alias = fn.id && fn.id !== name ? `${fn.id} as ${name}` : name;
      const prev = imports[fn.module];
      imports[fn.module] = prev ? [...prev, alias] : [alias];
    } else {
      vars[name] = String(fn);
    }
  }

  const is = Object.entries(imports).map(
    ([module, names]) =>
      `import { ${names.sort().join(", ")} } from ${JSON.stringify(module)};`
  );
  const vs = Object.entries(vars).map(([id, value]) =>
    new RegExp(`^function ${id}\\b`).test(value)
      ? value
      : `const ${id} = ${value};`
  );

  if (is.length > 0 && vs.length > 0) {
    is.push("");
  }
  return is.concat(vs).join("\n");
}

/**
 * Copied from https://github.com/messageformat/messageformat/blob/7c0ea87b1501925b8c1b6734ee0e3a59c25063d4/packages/core/src/compile-module.ts#L112-L115
 * @param {MessageFormat} messageformat
 * @returns {{}}
 */
function getAvailableLocals(messageformat) {
  const { plurals } = messageformat;
  const cp = {};
  if (plurals.length > 1) {
    for (const pl of plurals) {
      cp[pl.lc] = cp[pl.locale] = pl;
    }
  }
  return cp;
}
