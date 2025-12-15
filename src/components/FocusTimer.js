import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FocusTimer = ({ 
  selectedCategory, 
  timeLeft, 
  timerRunning,    // Yeni: Sayacın durup durmadığı bilgsisi
  onPauseResume,   // Yeni: Duraklat/Devam Et fonksiyonu
  onStop 
}) => {
  // Saniyeyi Dakika:Saniye formatına çevirme
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.categoryDisplay}>{selectedCategory}</Text>
      
      {/* Formatlanmış Zaman */}
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

      <Text style={[styles.statusText, { color: timerRunning ? '#4CAF50' : '#FFC107' }]}>
        {timerRunning ? "Odaklanma Modu Aktif 🧠" : "Duraklatıldı ⏸️"}
      </Text>

      {/* BUTONLAR GRUBU */}
      <View style={styles.buttonGroup}>
        {/* 1. Duraklat / Devam Et Butonu */}
        <TouchableOpacity 
          style={[styles.actionBtn, { backgroundColor: timerRunning ? '#FFC107' : '#4CAF50' }]} 
          onPress={onPauseResume}
        >
          <Text style={styles.btnText}>
            {timerRunning ? "DURAKLAT" : "DEVAM ET"}
          </Text>
        </TouchableOpacity>

        {/* 2. Bitir Butonu */}
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF5252' }]} onPress={onStop}>
          <Text style={styles.btnText}>BİTİR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  categoryDisplay: {
    fontSize: 24,
    color: '#666',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333',
    fontVariant: ['tabular-nums'],
  },
  statusText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 40,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 20, // Butonlar arası boşluk
  },
  actionBtn: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    minWidth: 140,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default FocusTimer;