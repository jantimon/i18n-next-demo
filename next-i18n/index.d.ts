export function useTranslate(lang: string): {
    __: (id: string, params?: Record<string, string | number>) => string;
};