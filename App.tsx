import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './screens/HomePage';
import MenuList from './screens/MenuList';
import MenuDisplay from './screens/MenuDisplay';
import FilterMenu from './screens/FilterMenu'; // <-- new screen

export type Dish = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
};

export type RootStackParamList = {
  HomePage: undefined;
  MenuList: undefined;
  MenuDisplay: undefined;
  FilterMenu: undefined; // <-- added
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [menuItems, setMenuItems] = useState<Dish[]>([]); // shared state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage">
          {(props) => <HomePage {...props} menuItems={menuItems} />}
        </Stack.Screen>

        <Stack.Screen name="MenuList">
          {(props) => (
            <MenuList
              {...props}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="MenuDisplay">
          {(props) => (
            <MenuDisplay
              {...props}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="FilterMenu">
          {(props) => <FilterMenu {...props} menuItems={menuItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
