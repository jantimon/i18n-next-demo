"use client";
import React from "react";

interface LanguageContextProps {
  lang: string;
}

const LanguageContext = React.createContext<LanguageContextProps>({
  lang: "en",
});

export const LanguageClientProvider = ({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) => {
  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useClientLanguage = () => {
  const { lang } = React.useContext(LanguageContext);
  return lang;
};
