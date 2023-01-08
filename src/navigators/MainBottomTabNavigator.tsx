import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FavouriteFliesScreen from '~screens/FavouriteFliesScreen';
import FliesStackNavigator from './FliesStackNavigator';

const Tab = createMaterialBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Flies"
        component={FliesStackNavigator}
        options={{
          tabBarLabel: 'Flies',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="hook" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouriteFliesScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
