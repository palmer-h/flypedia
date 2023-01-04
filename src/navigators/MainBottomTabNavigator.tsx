import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '~screens/HomeScreen';
import FliesScreen from '~screens/FliesScreen';
import ImitateesScreen from '~screens/ImitateesScreen';

const Tab = createMaterialBottomTabNavigator();

export default function MainBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Flies"
        component={FliesScreen}
        options={{
          tabBarLabel: 'Flies',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="hook" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Imitatees"
        component={ImitateesScreen}
        options={{
          tabBarLabel: 'Imitatees',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bug" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
