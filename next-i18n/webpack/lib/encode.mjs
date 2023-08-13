import { createHash } from "crypto";
export const translationPrefix = "__i18n_";

/**
 * Convert any String into a variable name
 *
 * e.g. "abc defg" -> "__i18n_abc__defg"
 * 
 * @param {string} prefix
 * @param {string} value
 */
export const generateVariableName = (prefix, value) =>
  prefix + value;

/**
 * Convert any String into a base32 hash
 * 
 * @param {string} value
 */
export const hash = (value) =>
  createHash("sha256").update(value).digest("hex");
