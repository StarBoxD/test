// Kişisel Profil ve Bento Vitrin Verileri (efedonmez.com)
const PROFILE_DATA = {
  name: "Efe Dönmez",
  handle: "efedonmez.com",
  title: "FTR Öğrencisi",
  status: {
    online: true,
    text: "Müzik açık, takılıyorum",
    tag: "Çevrimiçi"
  },
  bio: "Üniversitede FTR (Fizik Tedavi ve Rehabilitasyon) okuyorum. Günün çoğu okulda, derslerde ya da antrenmanda geçiyor; akşamları da müzik, arkadaşlarla oyun veya kafa dağıtmalık şeyler.",
  
  socials: [
    { 
      name: "Instagram", 
      url: "https://instagram.com/", 
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>` 
    },
    { 
      name: "Spotify", 
      url: "https://spotify.com/", 
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.307a.75.75 0 0 1-1.032.247c-2.827-1.727-6.385-2.118-10.578-1.16a.75.75 0 1 1-.334-1.462c4.588-1.047 8.52-.607 11.697 1.343a.75.75 0 0 1 .247 1.032zm1.464-3.262a.938.938 0 0 1-1.29.309c-3.238-1.99-8.175-2.565-12.005-1.402a.938.938 0 0 1-.55-1.792c4.375-1.328 9.81-.689 13.536 1.595a.938.938 0 0 1 .309 1.29zm.125-3.385c-3.882-2.305-10.287-2.518-14.004-1.39a1.125 1.125 0 1 1-.655-2.155c4.269-1.296 11.34-1.047 15.82 1.614a1.125 1.125 0 1 1-1.161 1.931z"/></svg>` 
    }
  ],

  bento: [
    {
      id: "okul",
      size: "large",
      badge: "FTR & Üniversite",
      badgeColor: "indigo",
      title: "FTR (Fizik Tedavi ve Rehabilitasyon)",
      description: "Üniversitede FTR okuyorum. Anatomi, kas-iskelet sistemi, pratik dersler ve hastane uygulamalarıyla geçiyor haftanın çoğu.",
      tags: ["FTR", "Fizyoterapi", "Anatomi", "Üniversite"]
    },
    {
      id: "spor",
      size: "medium",
      badge: "Spor & Antrenman",
      badgeColor: "emerald",
      title: "Düzenli Antrenman",
      description: "Hem bölümün doğası gereği hem de kendimi iyi hissettirdiği için düzenli spor yapıyorum. Ağırlık, vücut ağırlığı ve hareketlilik.",
      tags: ["Fitness", "Antrenman", "Disiplin"]
    },
    {
      id: "oyun",
      size: "small",
      badge: "Oyun & Kafa Dağıtma",
      badgeColor: "amber",
      title: "Akşamları Oyun",
      description: "Günün yorgunluğunu atmak için akşamları arkadaşlarla birkaç el oyun atmak en sevdiğim kısım.",
      tags: ["Oyun", "Rekabet", "Eğlence"]
    },
    {
      id: "muzik",
      size: "small",
      badge: "🎧 Müzik",
      badgeColor: "purple",
      title: "Sürekli Çalanlar",
      description: "Gün içinde kulaklık neredeyse hiç çıkmaz. Rap, synthwave, rock ya da o an moduma ne uyuyorsa o çalar.",
      tags: ["Spotify", "Karışık", "Playlist"]
    },
    {
      id: "sohbet",
      size: "medium",
      badge: "İletişim & Denge",
      badgeColor: "rose",
      title: "Kafa Dengi İnsanlar",
      description: "Gereksiz kasmayan, samimi ve dürüst insanlarla saatlerce sohbet edebilirim. Rahat ve olduğu gibi davranan insan her zaman kazanır.",
      tags: ["Samimiyet", "Sohbet", "Rahatlık"]
    }
  ],

  stats: [
    { label: "Bölüm", value: "FTR", sub: "Fizik Tedavi" },
    { label: "Rutin", value: "Antrenman", sub: "Düzenli hareket" },
    { label: "Akşam", value: "Oyun & Sohbet", sub: "Kafa dağıtma" },
    { label: "Müzik", value: "7/24", sub: "Kulaklık hep takılı" }
  ]
};
