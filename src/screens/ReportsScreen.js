import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert, TouchableOpacity } from 'react-native'; // Alert ve TouchableOpacity eklendi
import { useFocusEffect } from '@react-navigation/native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { getSessions, clearSessions } from '../utils/storage'; // clearSessions eklendi

const screenWidth = Dimensions.get('window').width;

const ReportsScreen = () => {
  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayFocus: 0,
    totalFocus: 0,
    totalDistractions: 0
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [pieData, setPieData] = useState([]);

  // --- VERİ İŞLEME FONKSİYONU ---
  const loadData = async () => {
    setLoading(true);
    const sessions = await getSessions(); // Tüm geçmişi getir

    // 1. GENEL İSTATİSTİKLERİ HESAPLA
    let todayTotal = 0;
    let grandTotal = 0;
    let distractionTotal = 0;
    
    const todayStr = new Date().toISOString().split('T')[0]; // "2025-12-14"

    sessions.forEach(session => {
      grandTotal += session.duration;
      distractionTotal += session.distractionCount;
      
      // Tarih kontrolü (Bugün mü?)
      if (session.date.startsWith(todayStr)) {
        todayTotal += session.duration;
      }
    });

    setStats({
      todayFocus: todayTotal,
      totalFocus: grandTotal,
      totalDistractions: distractionTotal
    });

    // 2. BAR CHART VERİSİ (SON 7 GÜN)
    const last7Days = [];
    const last7DaysData = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStr = d.toISOString().split('T')[0];
      const dayLabel = `${d.getDate()}/${d.getMonth() + 1}`; // Örn: 14/12

      // O güne ait toplam süreyi bul
      const daySessions = sessions.filter(s => s.date.startsWith(dayStr));
      const dayTotal = daySessions.reduce((sum, item) => sum + item.duration, 0);

      last7Days.push(dayLabel);
      last7DaysData.push(dayTotal);
    }

    setBarData({
      labels: last7Days,
      datasets: [{ data: last7DaysData }]
    });

    // 3. PIE CHART VERİSİ (KATEGORİ DAĞILIMI)
    const categoryMap = {};
    sessions.forEach(session => {
      if (!categoryMap[session.category]) {
        categoryMap[session.category] = 0;
      }
      categoryMap[session.category] += session.duration;
    });

    // Chart kütüphanesinin istediği formata çevir
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    const pData = Object.keys(categoryMap).map((cat, index) => ({
      name: cat,
      population: categoryMap[cat],
      color: colors[index % colors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    }));

    setPieData(pData);
    setLoading(false);
  };
  // --- VERİ SİLME FONKSİYONU ---
  const handleClearData = () => {
    Alert.alert(
      "Verileri Sıfırla",
      "Tüm odaklanma geçmişiniz silinecek. Emin misiniz?",
      [
        { text: "Vazgeç", style: "cancel" },
        { 
          text: "Evet, Hepsini Sil", 
          style: "destructive",
          onPress: async () => {
            await clearSessions(); // Veritabanını temizle
            loadData(); // Ekranı yenile (her şey 0 olacak)
          }
        }
      ]
    );
  };

  // Sayfa her odaklandığında verileri yeniden yükle
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Raporlar & Analiz</Text>

      {/* --- İSTATİSTİK KARTLARI --- */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.todayFocus} dk</Text>
          <Text style={styles.statLabel}>Bugün</Text>
        </View>
        <View style={[styles.statCard, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#ddd' }]}>
          <Text style={styles.statNumber}>{stats.totalFocus} dk</Text>
          <Text style={styles.statLabel}>Toplam</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#FF5252' }]}>{stats.totalDistractions}</Text>
          <Text style={styles.statLabel}>Odak Kopma</Text>
        </View>
      </View>

      {/* --- BAR CHART (SON 7 GÜN) --- */}
      <Text style={styles.chartTitle}>Son 7 Günlük Performans</Text>
      {barData.labels.length > 0 && (
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" dk"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />
      )}

      {/* --- PIE CHART (KATEGORİLER) --- */}
      <Text style={styles.chartTitle}>Kategori Dağılımı</Text>
      {pieData.length > 0 ? (
        <PieChart
          data={pieData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute // Değerleri mutlak sayı olarak göster
        />
      ) : (
        <Text style={styles.noDataText}>Henüz veri yok. Bir seans tamamlayın!</Text>
      )}
      {/* --- SİLME BUTONU --- */}
      <TouchableOpacity style={styles.clearButton} onPress={handleClearData}>
        <Text style={styles.clearButtonText}>TÜM VERİLERİ SİL / SIFIRLA</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />

      <View style={{ height: 50 }} /> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  chart: {
    borderRadius: 15,
    marginVertical: 8,
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  },
  clearButton: {
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF5252',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FF5252',
    fontWeight: 'bold',
    fontSize: 14,
  }
});

export default ReportsScreen;