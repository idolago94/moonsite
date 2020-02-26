import React from 'react';
import NavigatorTabs from './navigatorTabs';
import Routes from './Routes';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function NavigatorStack() {
  return (
    <Stack.Navigator initialRouteName={Routes.Screens.LOGIN.routeName}>
      <Stack.Screen
        name={Routes.Screens.LOGIN.routeName}
        component={LoginScreen}
      />
      <Stack.Screen
        name={Routes.Screens.REGISTER.routeName}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={Routes.Navigators.TABS.routeName}
        component={NavigatorTabs}
        options={{
            headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
