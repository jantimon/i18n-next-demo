import React from "react";

interface LanguageContextProps {
  lang: string;
}

interface LanguageProviderProps {
  lang: string;
  children: React.ReactNode;
}

export const LanguageServerProvider = ({
  lang,
  children,
}: LanguageProviderProps) => {
  setServerLanguage(lang);
  return <>{children}</>;
};

export const useServerLanguage = () => {
  return serverLanguage[0]() as string;
};

/**
 * From https://github.com/manvalls/server-only-context/blob/main/src/index.ts
 */
const createServerContext = <T extends {}>(
  defaultValue: T
): [() => T, (v: T) => void] => {
  const getRef = React.cache(() => ({ current: defaultValue }));
  const getValue = (): T => getRef().current;
  const setValue = (value: T) => {
    getRef().current = value;
  };
  return [getValue, setValue];
};

let serverLanguage: ReturnType<typeof createServerContext>;
const setServerLanguage = (lang: string) => {
  if (!serverLanguage) {
    serverLanguage = createServerContext(lang);
  }
  serverLanguage[1](lang);
};
