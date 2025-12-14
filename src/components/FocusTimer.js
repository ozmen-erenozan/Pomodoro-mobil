import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FocusTimer = ({ 
  selectedCategory, 
  timeLeft, 
  onStop 
}) => {
  // Saniyeyi Dakika:Saniye formatına çevirme (Örn: 1500 -> 25:00)
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

      <Text style={styles.statusText}>Odaklanma Modu Aktif</Text>

      <TouchableOpacity style={styles.stopBtn} onPress={onStop}>
        <Text style={styles.stopBtnText}>PES ET / BİTİR</Text>
      </TouchableOpacity>
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
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 10,
    marginBottom: 40,
  },
  stopBtn: {
    backgroundColor: '#FF5252',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  stopBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default FocusTimer;