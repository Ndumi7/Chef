// screens/HomePage.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dish } from '../App';

type HomePageProps = {
  navigation: any;
  menuItems: Dish[];
};

// New small component for average display
const CourseAverage = ({ course, menuItems }: { course: string; menuItems: Dish[] }) => {
  const items = menuItems.filter(d => d.course === course);
  const avg = items.length === 0 ? 0 : (items.reduce((sum, d) => sum + d.price, 0) / items.length).toFixed(2);
  return <Text style={styles.avgText}>{course} Avg: ${avg}</Text>;
};

export default function HomePage({ navigation, menuItems }: HomePageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plated</Text>
      <Text style={styles.subtitle}>Personalised dining at your fingertips</Text>
      <Text style={styles.description}>
        Welcome to Plated, the app that lets Chef Christoffel craft unique culinary experiences for every client.
      </Text>

      <View style={styles.averagesContainer}>
        <CourseAverage course="Starter" menuItems={menuItems} />
        <CourseAverage course="Main" menuItems={menuItems} />
        <CourseAverage course="Dessert" menuItems={menuItems} />
      </View>

      <TouchableOpacity
        style={styles.darkButton}
        onPress={() => navigation.navigate('MenuList')}
      >
        <Text style={styles.darkButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 14, color: '#ccc', marginBottom: 20, textAlign: 'center' },
  averagesContainer: { marginBottom: 40 },
  avgText: { color: '#fff', fontSize: 16, marginBottom: 5 },
  darkButton: { backgroundColor: '#333333', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  darkButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
