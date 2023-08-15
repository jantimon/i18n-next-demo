import React from "react";
import { useTranslate as useInternalTranslate } from "../hooks/useTranslate.mjs";
import {
  useClientLanguage,
  LanguageClientProvider,
} from "./ClientLanguageContext";
import {
  useServerLanguage,
  LanguageServerProvider,
} from "./ServerLanguageContext";

export const useLanguage = () => {
  try {
    return useClientLanguage();
  } catch (e) {
    return useServerLanguage();
  }
};

const isRsc = () => {
  try {
    React.createContext(null);
  } catch (e) {
    return true;
  }
  return false;
};

export const LanguageProvider = ({ lang, children }) => {
  if (!isRsc()) {
    return (
      <LanguageClientProvider lang={lang}>{children}</LanguageClientProvider>
    );
  }
  return (
    <LanguageServerProvider lang={lang}>
      <LanguageClientProvider lang={lang}>{children}</LanguageClientProvider>
    </LanguageServerProvider>
  );
};

export const useTranslate = () => {
  return useInternalTranslate(useLanguage());
};
