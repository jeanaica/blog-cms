import common from 'locales/en/common.json';

type TranslationKeys = keyof typeof common;

export default function useTranslation(_namespace?: string) {
  const t = (key: TranslationKeys): string => {
    return common[key] || key;
  };

  return { t };
}
