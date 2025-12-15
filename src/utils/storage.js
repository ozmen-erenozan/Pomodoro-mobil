import AsyncStorage from '@react-native-async-storage/async-storage';

// Kayıt anahtarımız (Veritabanı tablosu gibi düşün)
const STORAGE_KEY = '@focus_sessions';

/**
 * Yeni bir seansı kaydeder.
 * @param {object} session - { date, category, duration, distractionCount }
 */
export const saveSession = async (session) => {
  try {
    // 1. Mevcut verileri çek
    const existingData = await getSessions();
    
    // 2. Yeni seansı listeye ekle
    const newSessions = [...existingData, session];
    
    // 3. Güncellenmiş listeyi tekrar kaydet (JSON string olarak)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
    console.log("Seans başarıyla kaydedildi:", session);
  } catch (e) {
    console.error("Kaydetme hatası:", e);
  }
};

/**
 * Kayıtlı tüm seansları getirir.
 */
export const getSessions = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Okuma hatası:", e);
    return [];
  }
};

/**
 * (Opsiyonel) Tüm verileri siler - Test için
 */
export const clearSessions = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch(e) {
    console.error("Silme hatası:", e);
  }
};