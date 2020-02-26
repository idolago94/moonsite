import React, {Component} from 'react';
import 'react-native-gesture-handler';
// Components
import Screen from './src/components/Screen';
// Redux
import {Provider} from 'react-redux';
import store from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';


export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
            <StatusBar barStyle={'light-content'}/>
          <Screen />
        </Provider>
      </NavigationContainer>
    );
  }
}
