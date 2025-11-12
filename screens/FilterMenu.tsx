// screens/FilterMenu.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dish } from '../App';

type FilterMenuProps = {
  navigation: any;
  menuItems: Dish[];
};

export default function FilterMenu({ navigation, menuItems }: FilterMenuProps) {
  const [selectedCourse, setSelectedCourse] = useState('All');

  const filteredItems =
    selectedCourse === 'All'
      ? menuItems
      : menuItems.filter((dish) => dish.course === selectedCourse);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Filter Menu by Course</Text>

        <Picker
          selectedValue={selectedCourse}
          onValueChange={(value) => setSelectedCourse(value)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Starter" value="Starter" />
          <Picker.Item label="Main" value="Main" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>

        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>{item.description}</Text>
              <Text style={styles.cardText}>Course: {item.course}</Text>
              <Text style={styles.cardText}>Price: ${item.price.toFixed(2)}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, padding: 16, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  picker: { width: '100%', backgroundColor: '#333333', marginBottom: 20 },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  cardText: { fontSize: 14, color: '#ccc', marginBottom: 3 },
  backButton: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
