# Duel Hitung — Paket PWA

Folder ini adalah versi **Progressive Web App (PWA)** dari game "Duel Hitung —
Shinobi vs Samurai": bisa dipasang ke homescreen HP/laptop, jalan **offline**
setelah dibuka sekali, dan tampil layar penuh tanpa address bar seperti aplikasi native.

```
pwa/
├── index.html      # game (semua sprite/background sudah tertanam di dalamnya)
├── manifest.json   # identitas app (nama, ikon, warna tema)
├── sw.js           # service worker — bikin game bisa dimainkan offline
└── icons/          # ikon aplikasi (biasa & maskable, untuk Android/iOS)
```

## Kenapa harus di-*host*, tidak bisa cuma dibuka dari file?

Fitur PWA (installable + offline via service worker) hanya aktif kalau file
disajikan lewat **http/https** (atau `localhost`), bukan dibuka langsung dari
File Explorer (`file://`). Kalau kamu buka `index.html` langsung dari komputer,
game-nya tetap bisa dimainkan seperti biasa — cuma tombol "PASANG APP" dan mode
offline tidak akan muncul.

## Cara hosting (gratis, tanpa coding)

Pilih salah satu, lalu upload **seluruh isi folder `pwa/`** (bukan cuma index.html):

- **Netlify Drop** — buka [app.netlify.com/drop](https://app.netlify.com/drop),
  drag-and-drop folder `pwa`, langsung dapat link publik.
- **GitHub Pages** — upload folder ini ke repo GitHub, aktifkan Pages di Settings.
- **Vercel** / **Cloudflare Pages** — import folder yang sama, deploy sekali klik.

Setelah online, buka linknya di HP Android/iPhone lewat Chrome/Safari →
akan muncul opsi "Tambahkan ke Layar Utama" / tombol **PASANG APP** di dalam game.

## Mau tetap jadi file .apk?

Setelah PWA-nya online (langkah di atas), masukkan link-nya ke
**[PWABuilder.com](https://www.pwabuilder.com/)** (gratis, dari Microsoft):
1. Tempel URL PWA kamu → klik *Start*.
2. PWABuilder akan membaca `manifest.json` dan `sw.js` secara otomatis.
3. Pilih tab **Android** → *Generate Package* → unduh file `.apk`/`.aab` siap install.

Ini jauh lebih ringkas dibanding project Android Studio manual, karena
PWABuilder yang membungkus PWA-nya jadi APK secara otomatis.
