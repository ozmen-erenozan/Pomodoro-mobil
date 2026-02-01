#  Odaklanma Takibi ve Raporlama Uygulaması (Focus Tracker)


Bu proje, React Native (Expo) kullanılarak geliştirilmiş bir odaklanma ve verimlilik uygulamasıdır. Kullanıcıların Pomodoro tekniği benzeri zamanlayıcılar kurarak odaklanmalarını, dikkat dağınıklıklarını takip etmelerini ve geçmiş performanslarını grafiklerle analiz etmelerini sağlar.

## Özellikler

* ** Özelleştirilebilir Zamanlayıcı:** Kullanıcı odaklanmak istediği süreyi (varsayılan 25 dk) artırıp azaltabilir.
* ** Dinamik Kategori Yönetimi:** Kullanıcı "Ders", "Kodlama" gibi varsayılan kategorileri kullanabilir veya **kendi özel kategorisini ekleyebilir**.
* ** Dikkat Dağınıklığı Takibi (AppState):** Odaklanma sırasında uygulamadan çıkılırsa (arka plana atılırsa), sayaç otomatik durur ve bu durum "Odak Kopması" olarak kaydedilir.
* ** Gelişmiş Raporlama:**
    * **Günlük ve Toplam İstatistikler:** Toplam odaklanma süresi ve kopma sayıları.
    * **Çubuk Grafik (Bar Chart):** Son 7 günün performans analizi.
    * **Pasta Grafik (Pie Chart):** Odaklanılan kategorilerin oransal dağılımı.
* ** Veri Kalıcılığı (Persistence):** Tüm veriler `AsyncStorage` ile cihaz hafızasında tutulur. Uygulama kapatılıp açılsa bile veriler kaybolmaz.
## Kullanılan Teknolojiler ve Kütüphaneler

* **Core:** React Native, Expo Go
* **Dil:** JavaScript (ES6+)
* **Navigasyon:** `@react-navigation/native`, `@react-navigation/bottom-tabs`
* **Veri Saklama:** `@react-native-async-storage/async-storage`
* **Grafikler:** `react-native-chart-kit`, `react-native-svg`
* **UI Bileşenleri:** `@react-native-picker/picker`, `lodash`

---

##  Kurulum ve Çalıştırma (Adım Adım)

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Projeyi Klonlayın
Terminali açın ve projeyi bilgisayarınıza indirin:

2. Gerekli Paketleri Yükleyin
Proje dizinindeyken, bağımlılıkları (node_modules) yüklemek için şu komutu çalıştırın:
npm install
3. Uygulamayı Başlatın
Expo sunucusunu başlatmak için:
npx expo start -c
4. Telefon veya Emülatörde Açın
Fiziksel Cihaz: Telefonunuza "Expo Go" uygulamasını indirin ve terminalde çıkan QR kodu okutun.
Emülatör: Terminalde a (Android) veya i (iOS - sadece Mac) tuşuna basarak emülatörü başlatın.
