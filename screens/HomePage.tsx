import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomePage({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plated</Text>
      <Text style={styles.subtitle}>Personalised dining at your fingertips</Text>
      <Text style={styles.description}>
        Welcome to Plated, the app that lets Chef Christoffel craft unique culinary experiences for every client.
      </Text>

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
  description: { fontSize: 14, color: '#ccc', marginBottom: 40, textAlign: 'center' },
  darkButton: { backgroundColor: '#333333', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  darkButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
