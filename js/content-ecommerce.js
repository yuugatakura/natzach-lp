/**
 * Content for the standalone e-commerce ad-funnel landing page
 * (landing-ecommerce.html). Parallel to CONTENT in content.js —
 * same rule applies: every stat/quote traces to
 * market_research_-_dfy_website_for_indo_ecom_brands.md.
 *
 * Section order follows the brief: Hero (hook + mechanism) →
 * Problem (2 pain points) → Mechanism (free-draft proof) → CTA →
 * sticky bar → FAQ (max 2).
 */
const ECOM_LANDING_CONTENT = {
  brand: "Natzach",
  ctaUrl: "https://tally.so/r/RGlX9P",
  ctaLabel: "Isi Form, Dapetin Draft Gratis",

  hero: {
    headline: "Liat berapa fee marketplace makan dari omzet lo bulan ini.",
    accentPhrase: "makan",
    // Reused as-is from CONTENT.hero.leak in content.js — the signature
    // fee-leak visualization, not rebuilt for this page.
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

  // Trimmed to 2 of the 4 painGrid items in content.js — fee stacking + platform risk.
  problem: {
    eyebrow: "Masih Jualan 100% di Marketplace?",
    title: "Dua hal yang diam-diam menahan bisnismu",
    items: [
      {
        stat: "10–25%",
        title: "Potongan naik, bukan turun",
        body: "Biaya bertumpuk tiap tahun — komisi, biaya proses pesanan, promo/ongkir wajib. Belum ada tanda akan berhenti.",
        tag: "Rising fees",
        source: "Toco / Everpro / Mekari, 2026",
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

  // Replaces a traditional "proof" section — the free draft is the artifact
  // they judge themselves, not a claim someone else makes.
  mechanism: {
    eyebrow: "Kenapa Gratis",
    title: "Ini yang kita bangun duluan — sebelum kamu bayar apa pun.",
    steps: [
      {
        title: "Isi form (2–3 menit)",
        body: "Cerita singkat soal brand dan produk kamu sekarang.",
      },
      {
        title: "Kita bikin draft website brand kamu",
        body: "Asli dari brand kamu — bukan template kosong yang di-rename.",
      },
      {
        title: "Suka? Lanjut revisi + invoice. Gasuka? Skip aja.",
        body: "Tidak ada kewajiban, tidak ada tekanan follow-up.",
      },
    ],
    proofLine: "Sistem funnel & konversi yang bikin draft ini sudah teruji di TradingSahamWithAngel dan JLPT Accelerator — metodologinya proven, vertical e-commerce ini yang baru.",
  },

  cta: {
    label: "Isi Form, Dapetin Draft Gratis",
    microcopy: "Gratis. Liat dulu draftnya sebelum mikirin bayar — kalau gasuka, skip aja.",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Dua hal yang pasti kamu tanyain",
    items: [
      {
        q: "Kenapa gratis draft-nya?",
        a: "Karena draftnya emang buktinya, bukan buat mancing kamu masuk pitch panjang. Kalau hasilnya kamu suka, baru kita ngobrolin lanjut.",
      },
      {
        q: "Kalo saya gasuka drafnya gimana?",
        a: "Skip aja. Gaada kewajiban, gaada follow-up maksa.",
      },
    ],
  },
};
