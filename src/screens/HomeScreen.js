import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FocusSettings from '../components/FocusSettings';
import FocusTimer from '../components/FocusTimer';

const HomeScreen = () => {
  // --- STATE (DURUM) ---
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Ders Çalışma');
  const [workTime, setWorkTime] = useState(25); // Dakika cinsinden ayar
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Saniye cinsinden kalan süre

  // --- YARDIMCI FONKSİYONLAR ---
  
  const handleTimeChange = (amount) => {
    const newTime = workTime + amount;
    if (newTime > 0 && newTime <= 120) {
      setWorkTime(newTime);
      setTimeLeft(newTime * 60); // Ayar değişince kalan süreyi de güncelle
    }
  };

  const handleStart = () => {
    setTimeLeft(workTime * 60); // Başlarken süreyi saniyeye çevirip ayarla
    setTimerRunning(true);
    // Timer mantığı buraya eklenecek (Sonraki adım)
  };

  const handleStop = () => {
    setTimerRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Odaklanma Takibi</Text>

      {!timerRunning ? (
        // Component 1: Ayarlar
        <FocusSettings 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          workTime={workTime}
          onTimeChange={handleTimeChange}
          onStart={handleStart}
        />
      ) : (
        // Component 2: Sayaç
        <FocusTimer 
          selectedCategory={selectedCategory}
          timeLeft={timeLeft}
          onStop={handleStop}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    position: 'absolute', 
    top: 60,
  },
});

export default HomeScreen;