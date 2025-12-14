import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Başlık */}
      <Text style={styles.title}>Pomodoro</Text>

      {/* Başla Butonu */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => alert('Henüz kategori seçimi ekranı hazır değil')}
      >
        <Text style={styles.buttonText}>BAŞLA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF', // Mavi buton
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;