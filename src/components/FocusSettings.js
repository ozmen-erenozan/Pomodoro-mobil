import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FocusSettings = ({ 
  categories,          // YENİ: Kategori listesi dışarıdan geliyor
  selectedCategory, 
  setSelectedCategory, 
  onAddCategory,       // YENİ: Kategori ekleme fonksiyonu
  workTime, 
  onTimeChange, 
  onStart 
}) => {
  
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddPress = () => {
    if (newCategoryName.trim().length > 0) {
      onAddCategory(newCategoryName); // Listeye ekle
      setSelectedCategory(newCategoryName); // Yeni ekleneni seçili yap
      setNewCategoryName(''); // Kutuyu temizle
      setIsAdding(false); // Ekleme modunu kapat
    }
  };

  return (
    <View style={styles.settingsContainer}>
      
      {/* --- 1. KATEGORİ BAŞLIĞI VE (+) BUTONU --- */}
      <View style={styles.headerRow}>
        <Text style={styles.label}>Kategori Seçin:</Text>
        
        {/* Artı Butonu */}
        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={() => setIsAdding(!isAdding)}
        >
          <Text style={styles.addBtnText}>{isAdding ? "x" : "+"}</Text>
        </TouchableOpacity>
      </View>

      {/* --- KATEGORİ EKLEME KUTUSU (Sadece (+) basılınca görünür) --- */}
      {isAdding && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Yeni kategori adı..."
            value={newCategoryName}
            onChangeText={setNewCategoryName}
          />
          <TouchableOpacity style={styles.saveBtn} onPress={handleAddPress}>
            <Text style={styles.saveBtnText}>EKLE</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* --- KATEGORİ LİSTESİ (PICKER) --- */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          {/* Kategorileri döngü ile listeliyoruz */}
          {categories.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      {/* --- 2. SÜRE AYARLAMA --- */}
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

      {/* --- 3. BAŞLAT BUTONU --- */}
      <TouchableOpacity style={styles.startBtn} onPress={onStart}>
        <Text style={styles.startBtnText}>BAŞLA</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  addBtn: {
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -2
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  saveBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
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