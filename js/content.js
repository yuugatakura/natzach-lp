/**
 * Single source of truth for Natzach site copy, links, and figures.
 * Re-skinning or updating copy should only ever touch this file.
 * Every stat/quote traces to market_research_-_dfy_website_for_indo_ecom_brands.md.
 */
const CONTENT = {
  brand: "Natzach",
  ctaUrl: "https://tally.so/r/VLyxeM",
  ctaLabel: "Book Free Consultation",
  instagramUrl: "https://instagram.com/natzach.id",

  nav: [
    { label: "Kalkulator", href: "#kalkulator" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Bukti Kerja", href: "#bukti-kerja" },
    { label: "Kenapa Beda", href: "#kenapa-beda" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    headline: "Setiap transaksi, marketplace ambil bagian mereka dulu.",
    sub: "Misi kami adalah menggandeng Brand Owners punya Channel Penjualan yang sepenuhnya kamu miliki — supaya margin yang selama ini lari ke marketplace, balik ke kantong kamu dan jadi #LebihProfitable.",
    ctaMicrocopy: "Konsultasi gratis · Tanpa komitmen · Respons dalam 24 jam",
    secondaryLabel: "Lihat cara kerjanya",
    secondaryHref: "#cara-kerja",
    leak: {
      title: "Dari Rp100.000 omzet kamu di marketplace hari ini",
      caption: "Ilustrasi biaya rata-rata, 2026 — kategori fashion/beauty/FMCG",
      base: 100000,
      segments: [
        { label: "Admin / komisi kategori", amount: 10000, source: "Shopee kategori A ~10% · TikTok Shop komisi dasar" },
        { label: "Komisi dinamis", amount: 5000, source: "TikTok Shop Dynamic Commission Fee 4–6%, sejak 10 Jun 2025" },
        { label: "Biaya proses pesanan", amount: 1250, source: "Order Processing Fee Rp1.250/transaksi" },
        { label: "Promo & ongkir wajib", amount: 5000, source: "program gratis ongkir/promo wajib — est. Toco/Everpro" },
      ],
      netLabel: "Bersih masuk kantongmu",
      ownedNote: "Di kanal sendiri: dikurangi payment gateway ~2–3% (Midtrans/Xendit) — tetap infrastrukturmu, bukan “sewa” ke platform.",
      callout: "Contoh ekstrem: kategori Fashion & Sepatu, batas komisi dinamis TikTok Shop naik 15× dari Rp40.000 jadi Rp650.000/item, efektif 18 Mei 2026. Di transaksi bernilai tinggi, potongannya bisa jauh lebih besar dari ilustrasi di atas.",
      calloutSource: "Bisnis.com, 18 Mei 2026",
    },
  },

  feeTrend: {
    eyebrow: "Tren Biaya",
    title: "Biaya marketplace bergerak satu arah: naik.",
    subtitle: "Estimasi kumulatif dari kebijakan yang benar-benar terdokumentasi. Belum termasuk biaya iklan.",
    ownedLabel: "Kanal Sendiri (Website Kamu)",
    ownedValue: 2.5,
    bars: [
      { label: "Dasar", sublabel: "sebelum promo/ads", low: 5, high: 8, source: "Toco / Everpro / Mekari" },
      { label: "+Kategori", sublabel: "Shopee & TikTok Shop", low: 8, high: 12, source: "Tokopedia pra-ads" },
      { label: "+Promo/Ads", sublabel: "gratis ongkir / TopAds", low: 12, high: 20, source: "Tokopedia dgn TopAds" },
      { label: "2026", sublabel: "bertumpuk penuh", low: 20, high: 25, source: "Toco / Everpro / Mekari, 2026" },
    ],
    note: "Grafik ilustratif — disusun dari rentang biaya yang dilaporkan sumber di atas, bukan kurva presisi per tahun.",
  },

  calc: {
    eyebrow: "Coba Sendiri",
    title: "Masukkan omzet bulananmu",
    inputLabel: "Omzet bulanan (Rp)",
    defaultValue: 100000000,
    marketplaceLowPct: 0.10,
    marketplaceHighPct: 0.25,
    ownedPct: 0.025,
    marketLabel: "Potongan marketplace / bulan",
    ownedLabel: "Biaya di kanal sendiri / bulan",
    savingsLabel: "Berpotensi kamu selamatkan / bulan",
    savingsYearPrefix: "Setara ~",
    savingsYearSuffix: " / tahun",
    note: "Dihitung langsung di browser kamu — tidak ada data yang dikirim ke mana pun. Estimasi berbasis 10–25% potongan marketplace (Toco/Everpro/Mekari) vs ~2,5% payment gateway lokal (Midtrans/Xendit).",
  },

  painGrid: {
    eyebrow: "Masih Jualan 100% di Marketplace?",
    title: "Empat hal yang diam-diam menahan bisnismu",
    items: [
      {
        stat: "10–25%",
        title: "Potongan naik, bukan turun",
        body: "Biaya bertumpuk tiap tahun — komisi, biaya proses pesanan, promo/ongkir wajib. Belum ada tanda akan berhenti.",
        tag: "Rising fees",
        source: "Toco / Everpro / Mekari, 2026",
      },
      {
        stat: "Nol",
        title: "Data pelanggan yang kamu pegang",
        body: "Nomor WhatsApp & histori beli ada di platform, bukan di kamu — program loyalitas atau retargeting harus mulai dari nol kalau pindah kanal.",
        tag: "No retention",
        source: "Nailul Huda, ekonom CELIOS — UKMIndonesia.id, 13 Mei 2026",
      },
      {
        stat: "Tak Pasti",
        title: "Traffic yang bukan milikmu",
        body: "Ketergantungan pada algoritma dan posisi di antara lusinan kompetitor identik jadi alasan struktural untuk punya kanal sendiri.",
        tag: "No control",
      },
      {
        stat: "Sepihak",
        title: "Kebijakan yang bisa berubah kapan saja",
        body: "“Marketplace itu milik orang lain. Kalau suatu saat akun kamu dibekukan atau marketplace-nya berubah kebijakan, bisnis kamu bisa langsung kena dampaknya.”",
        tag: "Platform risk",
        source: "Crosstechno",
      },
    ],
  },

  bento: {
    eyebrow: "Cara Kerja",
    title: "Yang selama ini kamu “sewa” vs. yang bisa kamu miliki:",
    tiles: [
      {
        anchor: true,
        icon: "store",
        title: "Toko yang sepenuhnya milikmu",
        body: "Domain, data pelanggan, tampilan brand — tidak bisa dibekukan sepihak. Terhubung ke payment gateway lokal (Midtrans/Xendit) dan kurir pilihanmu.",
      },
      {
        icon: "traffic",
        title: "Mesin traffic yang tidak bergantung pada algoritma orang lain",
        body: "Funnel Meta & Google yang kamu kendalikan sendiri targeting-nya.",
      },
      {
        icon: "customers",
        title: "Daftar pelanggan sendiri",
        body: "WhatsApp broadcast & database pembeli yang bisa dihubungi ulang nyaris tanpa biaya iklan.",
      },
      {
        icon: "repeat",
        title: "Sistem repeat order",
        body: "Flow pembelian ulang & loyalitas — jualan ke orang yang sama tanpa bayar iklan lagi.",
      },
    ],
  },

  proof: {
    eyebrow: "Bukti Kerja",
    title: "Kami jujur soal ini",
    intro: "Fokus e-commerce ini baru. Tapi funnel, landing page, dan sistem konversi yang jadi tulang punggung offer ini sudah teruji di dua proyek berikut.",
    cards: [
      {
        tag: "Investment Education",
        title: "TradingSahamWithAngel",
        body: "Website Edukasi + Funnel Komunitas Investasi & Trading dari Angelica Jonatan.",
        visual: "trading",
      },
      {
        tag: "Education / VSL Funnel",
        title: "JLPT Accelerator by JLPTFinalBoss",
        body: "Program Belajar Bahasa Jepang untuk Pekerja Indonesia yang mau kerja di Jepang sebagai Imigran.",
        visual: "japan",
      },
      {
        tag: "Slot terbuka",
        title: "Brand kamu, berikutnya",
        body: "Kapasitas sengaja dibatasi untuk klien e-commerce pertama — bukan tempat kosong yang menunggu diisi siapa saja.",
        open: true,
      },
    ],
  },

  why: {
    eyebrow: "Kenapa Beda",
    title: "Ok, tapi ini beneran beda atau cuma agency template lain?",
    items: [
      {
        title: "Data kamu, milik kamu",
        body: "Nomor WhatsApp & histori pembelian tidak bisa “ditarik” platform.",
      },
      {
        title: "Delivery dibantu AI, bukan template murahan",
        body: "AI mempercepat proses build, tidak mengurangi penyesuaian ke brand/produk spesifik.",
      },
      {
        title: "WhatsApp-first, bukan email funnel",
        body: "Dirancang untuk cara pembeli Indonesia closing, bukan playbook luar negeri.",
      },
      {
        title: "Kita bahas angka kamu dulu, baru bicara harga",
        body: "Tidak ada paket generik di depan.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Bukan Cuma Perasaan Kamu",
    title: "Brand lain — dan bahkan pemerintah — sudah bicara soal ini di publik.",
    items: [
      {
        quote: "Harga bahan baku dan packaging naik hampir 30 persen… kami akan segera launch website resmi kami sendiri.",
        attribution: "Cliffton, co-founder True to Skin",
        source: "Suara.com, 11 Mei 2026",
      },
      {
        quote: "Naiknya fee platform berisiko mendorong seller beralih ke social commerce yang lebih murah — dan saat berjualan di marketplace, seluruh data pelanggan (preferensi, riwayat transaksi) ada di platform, bukan di seller. Artinya, program loyalitas atau retargeting harus mulai dari nol kalau seller pindah kanal.",
        attribution: "Nailul Huda, ekonom CELIOS (paraphrase)",
        source: "UKMIndonesia.id, 13 Mei 2026",
      },
      {
        quote: "Hari ini bermunculan gerakan tinggalkan Shopee dan Tokopedia/TikTok Shop.",
        attribution: "Gerakan viral di Threads/X, ratusan komentar",
        source: "Uzone.id, 4 Mei 2026",
      },
      {
        quote: "Keluhannya sudah lumayan banyak. Hampir setiap hari masuk ke saya, baik lewat DM Instagram, Facebook, maupun WhatsApp.",
        attribution: "Maman Abdurrahman, Menteri UMKM",
        source: "BeritaSatu, Mei 2026",
      },
    ],
  },

  metrics: {
    eyebrow: "Urgensi Pasar",
    title: "Angka ini bukan hasil kerja kami — ini kondisi pasar yang kamu hadapi sekarang.",
    items: [
      { value: "10–25%", unit: "", label: "Potongan biaya bertumpuk per transaksi marketplace, 2026", source: "Toco / Everpro / Mekari" },
      { value: "15", unit: "×", label: "Kenaikan batas komisi dinamis TikTok Shop — Rp40.000 → Rp650.000/item, efektif 18 Mei 2026", source: "Bisnis.com, 18 Mei 2026" },
      { value: "21", unit: " juta+", label: "Gabungan seller terdaftar di TikTok Shop + Tokopedia", source: "Kompas, April 2024" },
      { value: "~Rp1.600", unit: "", label: "Rata-rata CPC Meta Ads di Indonesia — kanal sendiri masih murah didatangi traffic", source: "Adsumo, pertengahan 2026" },
    ],
  },

  operator: {
    eyebrow: "Operator",
    title: "Bukan Tim. Operator.",
    name: "Denis",
    role: "Founder, Natzach",
    photoUrl: "https://cdn.scalev.com/uploads/1783439129/LSlLKk3Oq_RtByD9IiEBUw/1783439130614-IMG_20241220_141256_812.webp",
    principles: [
      "Bukan bikin toko online. Bikin infrastruktur: toko + traffic engine + audience yang lo kontrol sendiri.",
      "Kapasitas terbatas supaya kamu dapet perhatian penuh dari kami langsung, bukan tim junior.",
      "Operator Berpengalaman di Sistem yang sudah proven di vertical lainnya.",
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan yang pasti kamu pikirkan",
    items: [
      {
        q: "Kenapa tidak ada harga di halaman ini?",
        a: "Karena harga tergantung beban fee dan omzet kamu sekarang — ini dihitung di call, bukan ditebak dari paket generik.",
      },
      {
        q: "Saya masih jualan di marketplace, apa harus berhenti dulu?",
        a: "Tidak. Ini menambah satu kanal yang kamu miliki penuh, bukan menggantikan kanal yang sudah jalan.",
      },
      {
        q: "Berapa lama pengerjaannya?",
        a: "Delivery dibantu AI, jadi lebih cepat dari timeline agency pada umumnya. Scope pastinya dibahas di call.",
      },
      {
        q: "Kalian belum punya klien e-commerce, kenapa saya harus percaya?",
        a: "Lihat Bukti Kerja di atas — skill funnel dan konversinya sudah teruji, verticalnya saja yang baru. Klien awal dapat perhatian setingkat founder plus harga awal yang tidak akan berulang setelah case study e-commerce terbentuk.",
      },
      {
        q: "Apa yang terjadi setelah saya isi form?",
        a: "Call 15–20 menit via WhatsApp. Tidak ada tekanan untuk closing di call pertama.",
      },
    ],
  },

  finalCta: {
    headline: "Hitung dulu berapa yang bocor dari bisnismu bulan ini.",
    sub: "15 menit ngobrol, bukan sales pitch. Kalau memang tidak cocok, kamu akan tahu di call pertama — bukan setelah bayar.",
    steps: [
      "Isi form singkat",
      "Dijadwalkan via WhatsApp",
      "Bahas angka, bukan harga paket",
    ],
  },

  aboutUs: {
    eyebrow: "Tentang Kami",
    text: "Misi kami adalah membantu brand e-commerce Indonesia untuk tidak ketergantungan pada marketplace dengan memiliki Infrastruktur dan Ekosistem sendiri; yang mencakup namun tidak terbatas pada toko, traffic, dan database pelanggan — tujuannya satu: untuk jadi #LebihProfitable.",
    instagramLabel: "Ikuti proses kami untuk mentransformasi Brand jadi #LebihProfitable di Instagram →",
    instagramUrl: "https://instagram.com/denamshin",
  },

  footer: {
    tagline: "Endurance built into the business itself.",
  },
};
