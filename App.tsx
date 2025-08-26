import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // need to install this

type MenuItem = {
  name: string;
  description: string;
  course: string;
  price: string;
};

const Stack = createStackNavigator();

const courses = ["Starters", "Mains", "Desserts"];

function HomeScreen({ navigation, route }: any) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState("All");

  React.useEffect(() => {
    if (route.params?.menuItems) {
      setMenuItems(route.params.menuItems);
    }
  }, [route.params?.menuItems]);

  const filteredItems = filter === "All" ? menuItems : menuItems.filter(i => i.course === filter);
  const totalItems = filteredItems.length;

  const avgPrices = courses.map(course => {
    const items = menuItems.filter(i => i.course === course);
    if (items.length === 0) return `${course}: N/A`;
    const avg = (items.reduce((sum, i) => sum + parseFloat(i.price), 0) / items.length).toFixed(2);
    return `${course}: $${avg}`;
  });

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Christoffel's Menu</Text>

      <Text style={{ marginVertical: 5 }}>Total Items: {totalItems}</Text>
      <Text>Average Price per Course:</Text>
      {avgPrices.map((avg, idx) => (
        <Text key={idx}>{avg}</Text>
      ))}

      <Text style={{ marginTop: 10 }}>Filter by course:</Text>
      <Picker selectedValue={filter} onValueChange={setFilter}>
        <Picker.Item label="All" value="All" />
        {courses.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>

      <FlatList
        data={filteredItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name} - ${item.price}</Text>
            <Text>{item.description}</Text>
            <Text>Course: {item.course}</Text>
          </View>
        )}
      />

      <Button title="Add Menu Items" onPress={() => navigation.navigate('AddMenu', { menuItems })} />
    </View>
  );
}

function AddMenuScreen({ navigation, route }: any) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(route.params?.menuItems || []);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [course, setCourse] = useState("Starters");
  const [price, setPrice] = useState("");

  const addItem = () => {
    if (!name || !price) return;
    setMenuItems([...menuItems, { name, description: desc, course, price }]);
    setName("");
    setDesc("");
    setPrice("");
  };

  const removeItem = (index: number) => {
    const newItems = [...menuItems];
    newItems.splice(index, 1);
    setMenuItems(newItems);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Menu Items</Text>

      <TextInput placeholder="Dish Name" value={name} onChangeText={setName} style={{ borderWidth: 1, marginVertical: 5, padding: 5 }} />
      <TextInput placeholder="Description" value={desc} onChangeText={setDesc} style={{ borderWidth: 1, marginVertical: 5, padding: 5 }} />
      <Picker selectedValue={course} onValueChange={setCourse}>
        {courses.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>
      <TextInput placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} style={{ borderWidth: 1, marginVertical: 5, padding: 5 }} />

      <Button title="Add Dish" onPress={addItem} />

      <FlatList
        data={menuItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name} (${item.price})</Text>
            <TouchableOpacity onPress={() => removeItem(index)}>
              <Text style={{ color: 'red' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button title="Save & Go Back" onPress={() => navigation.navigate('Home', { menuItems })} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMenu" component={AddMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

