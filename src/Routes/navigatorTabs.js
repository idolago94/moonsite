import React from 'react';
import Routes from './Routes';
import DashboardScreen from '../Screens/DashboardScreen';
import AddScreen from '../Screens/AddScreen';
import FriendsScreen from '../Screens/FriendsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Platform} from 'react-native';
import Style from '../helpers/style/style';

const Tab = createBottomTabNavigator();

export default function NavigatorTabs() {
  return (
    <View
      style={{
        paddingTop: Platform.OS == 'ios' ? 40 : 0,
        flex: 1,
        backgroundColor: Style.colors.background,
      }}>
      <Tab.Navigator
        tabBarOptions={{style: {backgroundColor: Style.colors.bar}, activeTintColor: Style.colors.lightMain, inactiveTintColor: Style.colors.icon}}
        initialRouteName={Routes.Screens.DASHBOARD.routeName}>
        <Tab.Screen
          name={Routes.Screens.DASHBOARD.routeName}
          component={DashboardScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name={'home'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={Routes.Screens.ADD.routeName}
          component={AddScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name={'plus'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={Routes.Screens.FRIENDS.routeName}
          component={FriendsScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name={'users'} size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
