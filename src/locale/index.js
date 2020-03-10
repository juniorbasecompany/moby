import {
  AsyncStorage, 
  NativeModules, 
  Platform,
} from 'react-native';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    // Primeiro vamos checar se ja salvamos o
    // idioma do usuario, caso contrario vamos
    // detectar utilizando o NativeModules do RN
    const storedLanguage = await AsyncStorage.getItem('language');
    if (storedLanguage) {
      return callback(storedLanguage);
    }

    let phoneLanguage = null;
    if (Platform.OS === 'android') {
      phoneLanguage = NativeModules.I18Manager.localeIdentifier;
    } else {
      phoneLanguage = NativeModules.SettingsManager.settings.AppleLocale;
    }

    phoneLanguage = phoneLanguage.replace('_', '-');

    return callback(phoneLanguage);
  },
  init: () => {},
  cacheUserLanguage: language => {
    // Essa função sera chamada assim que o callback
    // da função 'detect' for executado. Aqui podemos
    // salvar o idioma do usuario no AsyncStorage para
    // persistirmos sua escolha nas próximas execuçōes do app
    AsyncStorage.setItem('language', language);
  },
};

