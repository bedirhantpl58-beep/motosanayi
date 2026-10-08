/**
 * MOTO SANAYİ - MERKEZİ YAPILANDIRMA DOSYASI
 * 
 * İşletme sahibi buradaki bilgileri (telefon, WhatsApp, Instagram,
 * adres, Google Maps linki vb.) kolayca güncelleyebilir.
 */

export const SITE_CONFIG = {
  // İŞLETME BİLGİLERİ
  businessName: 'MOTO SANAYİ',
  slogan: 'DOĞRU İŞLEM. DOĞRU AYAR. DOĞRU USTA.',
  subSlogan: 'Bakım, mekanik, CVT ve performans uygulamalarında profesyonel motosiklet servisi.',
  locationBadge: 'İstanbul · Kağıthane Sultan Selim',
  establishedYear: '2019',

  // İLETİŞİM BİLGİLERİ
  whatsapp: '+90 (533) 029 18 58',
  whatsappRaw: '905330291858',
  whatsappDefaultMessage: 'Merhaba Moto Sanayi, randevu ve servis işlemleri hakkında bilgi almak istiyorum.',

  instagram: '@motosanayi.istanbul',
  instagramUrl: 'https://instagram.com/motosanayi',

  email: 'info@motosanayi.com',

  // ADRES VE KONUM
  address: {
    title: 'Moto Sanayi Servis & Performans Merkezi',
    fullAddress: 'Sultan Selim Mahallesi Bayraktar Caddesi No: 60A Kağıthane / İstanbul',
    district: 'Kağıthane',
    city: 'İstanbul',
    directionsNote: 'Sultan Selim Mahallesi, Bayraktar Caddesi üzerinde merkezi ve kolay ulaşılabilir konum.',
    googleMapsUrl: 'https://maps.google.com/?q=Sultan+Selim+Mahallesi+Bayraktar+Caddesi+60A+Ka%C4%9F%C4%B1thane+%C4%B0stanbul',
  },

  // ÇALIŞMA SAATLERİ
  workingHours: [
    { days: 'Pazartesi - Cuma', hours: '09:00 - 19:30' },
    { days: 'Cumartesi', hours: '09:00 - 18:00' },
    { days: 'Pazar', hours: 'Pist & Test Günleri (Kapalı)' },
  ],

  // POPÜLER MARKA VE MODELLER
  motorcycleBrands: [
    {
      brand: 'Honda',
      popular: true,
      models: [
        'PCX 125',
        'PCX 160',
        'Forza 250',
        'Forza 350',
        'Forza 750',
        'Dio 110',
        'Activa 125',
        'ADV 350',
        'X-ADV 750',
        'CB250R / CB500F',
        'CBR650R / CB650R',
        'Diğer Honda Modeli'
      ]
    },
    {
      brand: 'Yamaha',
      popular: true,
      models: [
        'NMAX 125',
        'NMAX 155',
        'XMAX 250',
        'XMAX 300',
        'XMAX 400',
        'TMAX 560',
        'D\'elight 125',
        'MT-25',
        'MT-07',
        'MT-09',
        'YZF-R25',
        'YZF-R7',
        'Tracer 7 / Tracer 9',
        'Diğer Yamaha Modeli'
      ]
    },
    {
      brand: 'Vespa / Piaggio',
      popular: true,
      models: [
        'GTS 300 Super / HPE',
        'Primavera 125 / 150',
        'Sprint 125 / 150',
        'Beverly 300 / 400',
        'Medley 150',
        'Diğer Vespa/Piaggio'
      ]
    },
    {
      brand: 'SYM',
      popular: false,
      models: [
        'Jet 14 125/200',
        'Jet X 125',
        'Joymax Z+ 250/300',
        'Cruisym 250/300',
        'Symphony ST 125',
        'Maxsym TL 508',
        'Diğer SYM Modeli'
      ]
    },
    {
      brand: 'KYMCO',
      popular: false,
      models: [
        'Agility City 125/160',
        'Downtown 250/350',
        'Xciting 400',
        'AK 550',
        'People S 125',
        'Diğer KYMCO Modeli'
      ]
    },
    {
      brand: 'CF Moto',
      popular: false,
      models: [
        '250 SR',
        '250 NK',
        '450 SR',
        '650 MT / 700 CL-X',
        '150 NK',
        'Diğer CF Moto'
      ]
    },
    {
      brand: '125cc Şehir & Çin Grubu (RKS, Kuba, Mondial, Voge)',
      popular: true,
      models: [
        'RKS Wildcat 125',
        'RKS Freccia 150',
        'RKS Bitter / Arome 125',
        'Kuba Brilliant 125',
        'Kuba Space 50/125',
        'Mondial Revival 50/125',
        'Voge SR4 Max / SR1 125',
        'QJ Motor SRT/Fort',
        'Diğer 125cc Scooter'
      ]
    },
    {
      brand: 'Diğer / Özel Model',
      popular: false,
      models: ['Özel Model (Açıklamada Belirtiniz)']
    }
  ],

  // SERVİS HİZMETLERİ KATALOĞU
  services: [
    {
      id: 'periyodik-bakim',
      title: 'Periyodik Bakım',
      subtitle: 'Üretici Standartlarında 36 Nokta Kontrolü',
      description: 'Motor yağı (Motul/Putoline/Castrol), yağ filtresi, hava filtresi, buji, fren hidroliği, soğutma sıvısı ve genel güvenlik tork kontrolleri.',
      category: 'Temel Bakım',
      estimatedDuration: '45 - 90 Dakika',
      recommendedKm: 'Her 3.000 - 6.000 km',
      popular: true
    },
    {
      id: 'cvt-varyator',
      title: 'CVT & Varyatör Optimizasyonu',
      subtitle: 'Kalkış Titreşimine Son & Akıcı Tork İletimi',
      description: 'Varyatör açıcı temizliği, rampa kanalları revizyonu, baga (roller) gramaj ayarı, kayış tolerans testi ve debriyaj balata pürüzlendirmesi.',
      category: 'Scooter & Aktarma',
      estimatedDuration: '60 - 90 Dakika',
      recommendedKm: 'Her 5.000 km',
      popular: true
    },
    {
      id: 'performans-uygulamalari',
      title: 'Performans Varyatör & Debriyaj',
      subtitle: '0-60 km/s Ara Hızlanma & Maksimum Esneklik',
      description: 'Malossi Multivar, Polini Hi-Speed, J.Costa, Dr.Pulley baga/kaydırıcı ve yarış debriyaj yayları montajı & dinamik yol testi ile hassas gramaj ayarı.',
      category: 'Performans',
      estimatedDuration: '90 - 120 Dakika',
      recommendedKm: 'İsteğe Bağlı Geliştirme',
      popular: true
    },
    {
      id: 'ariza-tespiti-diyagnostik',
      title: 'Elektronik Arıza Tespiti',
      subtitle: 'OBD Beyin Diyagnostiği & Can-Bus İnceleme',
      description: 'Motor arıza lambası söndürme, ECU hata kodları analizi, TPS (gaz kelebeği) kalibrasyonu, enjektör püskürtme testi ve şarj voltaj testleri.',
      category: 'Diyagnostik',
      estimatedDuration: '30 - 60 Dakika',
      recommendedKm: 'Arıza Belirtisi Görüldüğünde',
      popular: false
    },
    {
      id: 'fren-suspansiyon',
      title: 'Fren Sistemleri & Lastik',
      subtitle: 'Brembo / EBC Balatalar & Milimetrik Disk Taşlama',
      description: 'Organik & sinterli fren balatası değişimi, hidrolik kanaması ve dot 4/5.1 yenileme, dijital balanslı lastik montajı (Michelin, Pirelli, Mitas).',
      category: 'Güvenlik & Yol Tutuş',
      estimatedDuration: '45 - 75 Dakika',
      recommendedKm: 'Düzenli Aşınma Kontrolü',
      popular: true
    },
    {
      id: 'motor-mekanik-revizyon',
      title: 'Motor Mekanik & Şanzıman',
      subtitle: 'Hassas Tork Anahtarlı Komple Mekanik Onarım',
      description: 'Sübap ayarı, silindir kapak taşlama, krank ve segman revizyonu, şanzıman dişli rulmanları değişimi ve sızdırmazlık contalama.',
      category: 'Ağır Mekanik',
      estimatedDuration: '1 - 3 İş Günü',
      recommendedKm: 'Ağır Bakım / Kompresyon Kaybı',
      popular: false
    },
    {
      id: 'yol-yardim-yerinde-servis',
      title: 'Yol Yardım & Yerinde Servis',
      subtitle: 'İstanbul Genelinde Profesyonel Transfer Aracı',
      description: 'Yolda kalma, akü bitmesi, kayış kopması veya çalışmama durumlarında donanımlı kapalı kasa transfer aracımızla güvenli nakil veya yerinde destek.',
      category: 'Acil Destek',
      estimatedDuration: 'Çağrı Üzerine 30-60 Dk',
      recommendedKm: 'İhtiyaç Halinde',
      popular: false
    }
  ],

  // ÇALIŞMA GÜVENİ PRENSİPLERİ
  transparencyPromises: [
    {
      title: 'İşleme Başlamadan Detaylı Bilgilendirme',
      desc: 'Motosikletiniz sehpaya alındığında önce kapsamlı kontrol yapılır, yapılacak işlemler ve parça maliyetleri kalem kalem size açıklanır.'
    },
    {
      title: 'Onayınız Olmadan 1 Kuruş Ekstra Yok',
      desc: 'Beklenmeyen bir aşınma fark edilirse sizi görüntülü veya telefonla arayıp onay almadan hiçbir ek işlem başlatılmaz.'
    },
    {
      title: 'Çıkan Eski Parçalar Kutusunda Teslim',
      desc: 'Değiştirilen buji, kayış, filtre, balata veya varyatör parçalarının tamamı yeni parçanın kutusu içinde size gösterilir ve teslim edilir.'
    },
    {
      title: 'Dijital Servis Geçmişi & Garanti',
      desc: 'Motosikletinizin her müdahalesi sistemimize kaydedilir; bir sonraki bakım zamanınız ve parça ömrünüz net olarak takip edilir.'
    }
  ]
};
