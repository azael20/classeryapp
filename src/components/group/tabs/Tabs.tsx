import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Group from '../Group';
import { Persons } from '../Persons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = (props: any) => {
  const groupData = props.route.params.item;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          borderTopColor: 'transparent',
        },
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Group') {
            iconName = 'newspaper-outline';
          } else {
            iconName = 'people-outline';
          }

          // @ts-ignore
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: '#38cc94',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Group"
        options={{ title: 'Novedades' }}
        component={Group}
        initialParams={groupData}
      />
      <Tab.Screen
        name="Persons"
        options={{ title: 'Personas' }}
        component={Persons}
        initialParams={groupData}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
