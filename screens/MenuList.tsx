import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dish } from '../App';

type MenuListProps = {
  navigation: any;
  menuItems: Dish[];
  setMenuItems: React.Dispatch<React.SetStateAction<Dish[]>>;
  route?: any; // to receive editDish param
};

export default function MenuList({ navigation, menuItems, setMenuItems, route }: MenuListProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Starter');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (route?.params?.editDish) {
      const dish = route.params.editDish as Dish;
      setDishName(dish.name);
      setDescription(dish.description);
      setPrice(dish.price.toString());
      setCourse(dish.course);
      setEditingId(dish.id);
    }
  }, [route?.params?.editDish]);

  const addOrUpdateDish = () => {
    if (!dishName || !price) {
      Alert.alert('Please enter dish name and price');
      return;
    }

    if (editingId) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingId
            ? { ...item, name: dishName, description, price: parseFloat(price), course }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newDish: Dish = {
        id: Date.now().toString(),
        name: dishName,
        description,
        course,
        price: parseFloat(price),
      };
      setMenuItems([...menuItems, newDish]);
    }

    setDishName('');
    setDescription('');
    setPrice('');
    setCourse('Starter');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Add/Edit Menu Items</Text>
          <Text style={styles.subtitle}>Total dishes: {menuItems.length}</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Dish Name"
              value={dishName}
              onChangeText={setDishName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            <Text style={styles.courseLabel}>Course:</Text>
            <Picker
              selectedValue={course}
              onValueChange={(itemValue) => setCourse(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Starter" value="Starter" />
              <Picker.Item label="Main" value="Main" />
              <Picker.Item label="Dessert" value="Dessert" />
            </Picker>

            <TouchableOpacity style={styles.largeButton} onPress={addOrUpdateDish}>
              <Text style={styles.buttonText}>{editingId ? 'Update Dish' : 'Add Dish'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.largeButton}
              onPress={() => navigation.navigate('MenuDisplay')}
            >
              <Text style={styles.buttonText}>View Added Dishes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.largeButton}
              onPress={() => navigation.navigate('FilterMenu', { menuItems })}
            >
              <Text style={styles.buttonText}>Filter Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.largeButton}
              onPress={() => navigation.navigate('HomePage')}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 30, textAlign: 'center' },
  form: { width: '100%', marginBottom: 25, alignItems: 'center' },
  input: { backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 8, width: '100%' },
  courseLabel: { color: '#fff', fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 5 },
  picker: { backgroundColor: '#fff', marginBottom: 25, width: '100%' },
  largeButton: {
    backgroundColor: '#333333',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
