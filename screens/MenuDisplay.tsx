// screens/MenuDisplay.tsx
import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar, Alert } from 'react-native';
import { Dish } from '../App';

type MenuDisplayProps = {
  navigation: any;
  menuItems: Dish[];
  setMenuItems: React.Dispatch<React.SetStateAction<Dish[]>>;
};

// Reusable DishCard component
const DishCard = ({ dish, onEdit, onRemove }: { dish: Dish; onEdit: (d: Dish) => void; onRemove: (id: string) => void }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{dish.name}</Text>
    <Text style={styles.cardText}>{dish.description}</Text>
    <Text style={styles.cardText}>Course: {dish.course}</Text>
    <Text style={styles.cardText}>Price: ${dish.price.toFixed(2)}</Text>

    <View style={styles.cardButtons}>
      <TouchableOpacity style={[styles.cardButton, { backgroundColor: '#4CAF50' }]} onPress={() => onEdit(dish)}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.cardButton, { backgroundColor: '#F44336' }]} onPress={() => onRemove(dish.id)}>
        <Text style={styles.buttonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function MenuDisplay({ navigation, menuItems, setMenuItems }: MenuDisplayProps) {
  const handleEdit = (dish: Dish) => navigation.navigate('MenuList', { editDish: dish });

  const handleRemove = (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to remove this dish?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setMenuItems(menuItems.filter(d => d.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Tonight’s Menu</Text>

        {menuItems.length === 0 ? (
          <Text style={styles.emptyText}>No dishes added yet.</Text>
        ) : (
          <FlatList
            data={menuItems}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => <DishCard dish={item} onEdit={handleEdit} onRemove={handleRemove} />}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          />
        )}

        <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('MenuList')}>
          <Text style={styles.buttonText}>Add New Dish</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContainer: { padding: 16, alignItems: 'center', paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 20 },
  emptyText: { color: '#ccc', textAlign: 'center', marginTop: 50, fontSize: 16 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 10, width: 350, padding: 15 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  cardText: { fontSize: 14, color: '#ccc', marginBottom: 5 },
  cardButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cardButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  mainButton: { backgroundColor: '#333333', paddingVertical: 15, borderRadius: 8, marginTop: 20, width: '95%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
