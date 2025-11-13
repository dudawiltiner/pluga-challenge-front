import React, { createContext, useContext } from 'react';

import {
  Langs,
  defaultLang,
  dictionaries,
} from '@dictionaries/default-dictionaries';

interface DictionaryContextValue {
  lang: Langs;
  dictionary: (typeof dictionaries)[Langs];
}

const DictionaryContext = createContext<DictionaryContextValue>({
  lang: defaultLang,
  dictionary: dictionaries[defaultLang],
});

interface DictionaryProviderProps {
  children: React.ReactNode;
  lang?: Langs;
}

export const DictionaryProvider: React.FC<DictionaryProviderProps> = ({
  children,
  lang = defaultLang,
}) => {
  const dictionary = dictionaries[lang];

  return (
    <DictionaryContext.Provider value={{ lang, dictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = (): DictionaryContextValue => {
  const context = useContext(DictionaryContext);

  if (!context) {
    throw new Error(
      'useDictionary deve ser usado dentro de um DictionaryProvider'
    );
  }

  return context;
};
