import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, AppState } from 'react-native';
import FocusSettings from '../components/FocusSettings';
import FocusTimer from '../components/FocusTimer';
// YENİ: Storage servisini içe aktar
import { saveSession } from '../utils/storage';

const HomeScreen = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState('Ders Çalışma');
  const [workTime, setWorkTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [distractionCount, setDistractionCount] = useState(0);
  
  const appState = useRef(AppState.currentState);

  // --- KAYIT FONKSİYONU ---
  const saveCurrentSession = async (completed) => {
    // Geçen süreyi hesapla (Toplam süre - Kalan süre)
    const timeSpentSeconds = (workTime * 60) - timeLeft;
    const timeSpentMinutes = Math.floor(timeSpentSeconds / 60);

    // Eğer 1 dakikadan az çalışıldıysa kaydetme (Gereksiz veri olmasın)
    if (timeSpentMinutes < 1) return;

    const sessionData = {
      id: Date.now(), // Benzersiz ID
      date: new Date().toISOString(), // Bugünün tarihi
      category: selectedCategory,
      duration: timeSpentMinutes, // Dakika cinsinden süre
      distractionCount: distractionCount,
      status: completed ? 'Tamamlandı' : 'Yarıda Kesildi'
    };

    await saveSession(sessionData);
  };

  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
      handleSessionComplete();
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/active/) && (nextAppState === 'background' || nextAppState === 'inactive')) {
        if (timerRunning) {
          setTimerRunning(false);
          setDistractionCount(prev => prev + 1);
        }
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, [timerRunning]);

  const handleTimeChange = (amount) => {
    const newTime = workTime + amount;
    if (newTime > 0 && newTime <= 120) {
      setWorkTime(newTime);
      setTimeLeft(newTime * 60);
    }
  };

  const handleStart = () => {
    setTimeLeft(workTime * 60);
    setDistractionCount(0);
    setIsSessionActive(true);
    setTimerRunning(true);
  };

  const handlePauseResume = () => {
    setTimerRunning(!timerRunning);
  };

  // GÜNCELLENEN: Durdurma Fonksiyonu
  const handleStop = () => {
    Alert.alert(
      "Seansı Bitir",
      "Şu ana kadar odaklandığın süre kaydedilsin mi?",
      [
        { text: "Vazgeç", style: "cancel" },
        { 
          text: "Kaydetmeden Bitir", 
          style: "destructive", 
          onPress: () => {
             setIsSessionActive(false);
             setTimerRunning(false);
          }
        },
        { 
          text: "Kaydet ve Bitir", 
          onPress: async () => {
             await saveCurrentSession(false); // false = tamamlanmadı
             setIsSessionActive(false);
             setTimerRunning(false);
          }
        }
      ]
    );
  };

  // GÜNCELLENEN: Tamamlama Fonksiyonu
  const handleSessionComplete = async () => {
    // Önce kaydet
    await saveCurrentSession(true); // true = tamamlandı

    // Sonra tebrik et
    Alert.alert(
      "Tebrikler! 🎉",
      `Odaklanma tamamlandı!\nKategori: ${selectedCategory}\nDikkat Dağınıklığı: ${distractionCount} kez`,
      [{ 
        text: "Harika", 
        onPress: () => {
          setIsSessionActive(false); 
        } 
      }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Odaklanma Takibi</Text>
      {!isSessionActive ? (
        <FocusSettings 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          workTime={workTime}
          onTimeChange={handleTimeChange}
          onStart={handleStart}
        />
      ) : (
        <FocusTimer 
          selectedCategory={selectedCategory}
          timeLeft={timeLeft}
          timerRunning={timerRunning}
          onPauseResume={handlePauseResume}
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