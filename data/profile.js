// Kişisel Profil ve Bento Vitrin Verileri (efedonmez.com)
const PROFILE_DATA = {
  name: "Efe Dönmez",
  handle: "efedonmez.com",
  title: "FTR Öğrencisi",
  status: {
    online: true,
    text: "Müzik açık, takılıyorum",
    tag: "Çevrimiçi 🟢"
  },
  bio: "Üniversitede FTR (Fizik Tedavi ve Rehabilitasyon) okuyorum. Günün çoğu okulda, derslerde ya da antrenmanda geçiyor; akşamları da müzik, arkadaşlarla oyun veya kafa dağıtmalık şeyler.",
  
  socials: [
    { name: "Instagram", url: "https://instagram.com/", icon: "📸" },
    { name: "Spotify", url: "https://spotify.com/", icon: "🎵" }
  ],

  bento: [
    {
      id: "okul",
      size: "large",
      badge: "🎓 Okul",
      badgeColor: "indigo",
      title: "FTR (Fizik Tedavi ve Rehabilitasyon)",
      description: "Üniversitede FTR okuyorum. Anatomi, kas-iskelet sistemi, pratik dersler ve hastane uygulamalarıyla geçiyor haftanın çoğu.",
      tags: ["FTR", "Fizyoterapi", "Anatomi", "Üniversite"]
    },
    {
      id: "spor",
      size: "medium",
      badge: "💪 Spor & Hareket",
      badgeColor: "emerald",
      title: "Düzenli Antrenman",
      description: "Hem bölümün doğası gereği hem de kendimi iyi hissettirdiği için düzenli spor yapıyorum. Ağırlık, vücut ağırlığı ve hareketlilik.",
      tags: ["Fitness", "Antrenman", "Disiplin"]
    },
    {
      id: "oyun",
      size: "small",
      badge: "🎮 Oyun",
      badgeColor: "amber",
      title: "Oyun & Muhabbet",
      description: "Günün yorgunluğunu atmak için akşamları arkadaşlarla toplanıp birkaç el oyun atmak, sohbet etmek en sevdiğim kısım.",
      tags: ["Oyun", "Muhabbet", "Kafa Dağıtma"]
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
      badge: "☕ İletişim",
      badgeColor: "rose",
      title: "Kafa Dengi Muhabbet",
      description: "Gereksiz kasmayan, samimi ve dürüst insanlarla saatlerce muhabbet edebilirim. Rahat ve olduğu gibi davranan insan her zaman kazanır.",
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
