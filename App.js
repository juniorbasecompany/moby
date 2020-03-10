import React, { Component } from 'react';
import {
  AsyncStorage,
  FlatList,
  I18nManager,
  Platform, 
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
  } from 'react-native';
  import i18n from "i18n-js";
  import memoize from "lodash.memoize"; // Use for caching/memoize for better performance

const instructions = Platform.select({
  ios: 'Plataforma iOS',
  android: 'Plataforma Android',
  web: 'Plataforma WEB',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Tudo OK! 12</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.value}>{translate("hello")}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: '#888888',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const getTranslation = {
  en_US: () => require("./src/locale/translation/en_US.json"),
  pt_BR: () => require("./src/locale/translation/pt_BR.json"),
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = () => {
  // Linguagem default.
  var locale = "en_US";
  // Vamos ler a linguagem que o usuário pode ter escolhido antes.
  AsyncStorage.getItem('locale').then((value) => {
    // Se ele havia escolhido...
    if (value) {
      // Vamos usar a linguágem que ele escolheu.
      locale = value;
    }
  });

  // Vamos limpar o cache de trandução.
  translate.cache.clear();
  
  // E definir um novo conjunto de mensagens.
  i18n.translations = { [locale]: getTranslation[locale]() };
  i18n.locale = locale;
};
