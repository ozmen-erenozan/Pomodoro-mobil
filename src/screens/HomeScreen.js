import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, AppState } from 'react-native';
import FocusSettings from '../components/FocusSettings';
import FocusTimer from '../components/FocusTimer';

const HomeScreen = () => {
  // --- STATE (DURUM) ---
  const [isSessionActive, setIsSessionActive] = useState(false); // Oturum başladı mı?
  const [timerRunning, setTimerRunning] = useState(false);       // Sayaç akıyor mu? (Duraklatma için)
  
  const [selectedCategory, setSelectedCategory] = useState('Ders Çalışma');
  const [workTime, setWorkTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  const [distractionCount, setDistractionCount] = useState(0); // Dikkat Dağınıklığı Sayısı
  
  // AppState takibi için referans (Active, Background, Inactive)
  const appState = useRef(AppState.currentState);

  // --- 1. SAYAÇ MANTIĞI (TIMER LOGIC) ---
  useEffect(() => {
    let interval = null;

    if (timerRunning && timeLeft > 0) {
      // Sayaç çalışıyorsa her 1 saniyede bir süreyi azalt
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Süre bittiyse durdur
      setTimerRunning(false);
      handleSessionComplete(); // Seansı bitirme fonksiyonunu çağır
    }

    // Temizlik (Component kapanırsa sayacı durdur)
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  // --- 2. DİKKAT DAĞINIKLIĞI MANTIĞI (APP STATE) ---
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      
      // Eğer uygulama 'active' durumundan 'background' (arka plan) durumuna geçerse
      if (
        appState.current.match(/active/) && 
        (nextAppState === 'background' || nextAppState === 'inactive')
      ) {
        // SADECE sayaç çalışıyorsa müdahale et
        if (timerRunning) {
          console.log("Uygulama arka plana atıldı! Sayaç durduruluyor...");
          setTimerRunning(false); // Sayacı otomatik duraklat 
          setDistractionCount(prev => prev + 1); // Hatayı 1 artır 
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [timerRunning]);


  // --- BUTON FONKSİYONLARI ---

  const handleTimeChange = (amount) => {
    const newTime = workTime + amount;
    if (newTime > 0 && newTime <= 120) {
      setWorkTime(newTime);
      setTimeLeft(newTime * 60);
    }
  };

  const handleStart = () => {
    setTimeLeft(workTime * 60);
    setDistractionCount(0); // Hata sayacını sıfırla
    setIsSessionActive(true); // Ekranı değiştir
    setTimerRunning(true);    // Sayacı başlat
  };

  const handlePauseResume = () => {
    setTimerRunning(!timerRunning); // Tersine çevir (Başlat/Durdur)
  };

  const handleStop = () => {
    // Kullanıcıya soralım: Emin misin?
    Alert.alert(
      "Seansı Bitir",
      "Pes mi ediyorsun? Bu seans kaydedilmeyecek.",
      [
        { text: "Vazgeç", style: "cancel" },
        { 
          text: "Evet, Bitir", 
          style: "destructive", 
          onPress: () => {
             setIsSessionActive(false);
             setTimerRunning(false);
             // İleride buraya "Yarım kalan seansı kaydetme" mantığı eklenebilir
          }
        }
      ]
    );
  };

  // Seans süresi dolunca çalışacak fonksiyon
  const handleSessionComplete = () => {
    Alert.alert(
      "Tebrikler! 🎉",
      `Odaklanma tamamlandı!\nKategori: ${selectedCategory}\nDikkat Dağınıklığı: ${distractionCount} kez`,
      [{ 
        text: "Harika", 
        onPress: () => {
          setIsSessionActive(false); 
          // BURADA VERİYİ KAYDEDECEĞİZ (Sonraki Faz)
        } 
      }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Odaklanma Takibi</Text>

      {!isSessionActive ? (
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