// import en from '../en/en.json';
// import ko from '../ko/ko.json';
//
// export const dictionaries = {
//     en,
//     ko,
// };
//
// export type Locale = keyof typeof dictionaries;
//
// export const getDictionary = (locale: Locale) => dictionaries[locale];


import 'server-only';

export type Locale = 'en' | 'ko';

const dictionaries: Record<Locale, () => Promise<Record<string, any>>> = {
    en: () => import('../en/en.json').then((module) => module.default),
    ko: () => import('../ko/ko.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
