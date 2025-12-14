import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FocusSettings = ({ 
  selectedCategory, 
  setSelectedCategory, 
  workTime, 
  onTimeChange, 
  onStart 
}) => {
  return (
    <View style={styles.settingsContainer}>
      {/* 1. KATEGORİ SEÇİMİ */}
      <Text style={styles.label}>Kategori Seçin:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="📚 Ders Çalışma" value="Ders Çalışma" />
          <Picker.Item label="💻 Kodlama" value="Kodlama" />
          <Picker.Item label="📖 Kitap Okuma" value="Kitap Okuma" />
          <Picker.Item label="🚀 Proje" value="Proje" />
        </Picker>
      </View>

      {/* 2. SÜRE AYARLAMA */}
      <Text style={styles.label}>Süre (Dakika):</Text>
      <View style={styles.timeControl}>
        <TouchableOpacity onPress={() => onTimeChange(-5)} style={styles.timeBtn}>
          <Text style={styles.timeBtnText}>-5</Text>
        </TouchableOpacity>
        
        <Text style={styles.timeDisplay}>{workTime} dk</Text>
        
        <TouchableOpacity onPress={() => onTimeChange(5)} style={styles.timeBtn}>
          <Text style={styles.timeBtnText}>+5</Text>
        </TouchableOpacity>
      </View>

      {/* 3. BAŞLAT BUTONU */}
      <TouchableOpacity style={styles.startBtn} onPress={onStart}>
        <Text style={styles.startBtnText}>ODAKLANMAYA BAŞLA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '600',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
  },
  timeControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  timeBtn: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    width: 60,
    alignItems: 'center',
  },
  timeBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  startBtn: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  startBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FocusSettings;