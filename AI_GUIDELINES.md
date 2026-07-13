# Motionz AI Guidelines

## Tujuan Proyek
Motionz adalah library TypeScript ringan untuk menghidupkan elemen DOM saat mereka masuk ke viewport menggunakan Intersection Observer.

## Struktur Utama
- `src/index.ts`: ekspor default dari instance Motionz dan tipe opsi.
- `src/core/Motionz.ts`: API publik `init`, `refresh`, `destroy`, dan `register`.
- `src/core/Engine.ts`: logika utama inisialisasi, pendeteksian, pendaftaran animasi, dan pengamatan elemen.
- `src/core/Observer.ts`: wrapper sederhana untuk `IntersectionObserver`.
- `src/core/Parser.ts`: parsing atribut `data-motion` / `data-motionz` ke dalam opsi.
- `src/core/Registry.ts`: penyimpanan registry animasi.
- `src/animations/fade.ts`: animasi built-in "fade".
- `src/types/MotionzOptions.ts`: tipe opsi library.
- `src/styles/motionz.css`: kelas utilitas CSS untuk animasi.

## API
### `Motionz.init(options?)`
- `options` adalah `MotionzOptions`.
- Mendaftarkan animasi default `fade` apabila belum diinisialisasi.
- Memulai observer dan memproses elemen dengan atribut `data-motionz` atau `data-motion`.

### `Motionz.refresh()`
- Mengulang observasi semua elemen target.

### `Motionz.destroy()`
- Menghentikan observer dan mengembalikan status library.

### `Motionz.register(name, animation)`
- Mendaftarkan animasi custom ke registry.
- `animation` menerima element dan opsi.

## Opsi yang Didukung
- `once`: boolean, jalankan sekali saja.
- `offset`: jarak px rootMargin vertikal.
- `duration`: durasi transisi dalam ms.
- `delay`: penundaan dalam ms.
- `easing`: fungsi easing CSS.
- `animation`: nama animasi registry.

## Atribut DOM yang Didukung
- `data-motionz`: nama animasi atau shorthand untuk efek.
- `data-motion`: alias `data-motionz`.
- `data-motionz-once` / `data-motion-once`: `true` / `false`.
- `data-motionz-offset` / `data-motion-offset`.
- `data-motionz-duration` / `data-motion-duration`.
- `data-motionz-delay` / `data-motion-delay`.
- `data-motionz-easing` / `data-motion-easing`.

## Rekomendasi AI
- Fokus memperbaiki API publik dengan meminimalkan breaking change.
- Pastikan `src/core/Engine.ts` menggunakan `Observer`, `Parser`, `Registry`, dan animasi default.
- Pertahankan file kosong yang sudah ada di proyek dengan menambahkan implementasi yang jelas.
- Tambahkan dokumentasi ringkas di file root ketika perlu memandu developer.
