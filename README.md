# Motionz

Motionz adalah library TypeScript ringan untuk membuat animasi elemen DOM masuk
ke viewport menggunakan `IntersectionObserver`.

## Fitur

- Animasi `fade` otomatis ketika elemen muncul di viewport
- Registrasi animasi kustom
- Dukungan opsi global dan atribut `data-` pada elemen
- API sederhana: `init`, `refresh`, `destroy`, `register`

## Instalasi

> Jika menggunakan npm

```bash
npm install motionz
```

> Jika menggunakan Yarn

```bash
yarn add motionz
```

## Penggunaan

### 1. Inisialisasi dasar

```ts
import Motionz from "motionz";

Motionz.init();
```

### 2. Inisialisasi dengan opsi global

```ts
Motionz.init({
  once: true,
  offset: 50,
  duration: 800,
  delay: 100,
  easing: "ease-out",
});
```

### 3. Menggunakan atribut HTML

Gunakan atribut `data-motionz` atau `data-motion` pada elemen untuk memicu
animasi.

```html
<div data-motion="fade">Halo dunia</div>
```

### 4. Opsi per-elemen

```html
<div
  data-motion="fade"
  data-motion-duration="1000"
  data-motion-delay="200"
  data-motion-easing="ease-in-out"
  data-motion-once="false"
>
  Animasi khusus
</div>
```

### 5. Animasi kustom

```ts
Motionz.register("slide", (element, options) => {
  element.style.opacity = "0";
  element.style.transform = "translateX(-24px)";
  element.style.transition = `opacity ${options.duration ?? 600}ms ${options.easing ?? "ease-out"} ${options.delay ?? 0}ms, transform ${options.duration ?? 600}ms ${options.easing ?? "ease-out"} ${options.delay ?? 0}ms`;

  requestAnimationFrame(() => {
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
  });
});

Motionz.init();
```

Lalu di HTML:

```html
<div data-motion="slide">Slide in</div>
```

## API

### `Motionz.init(options?)`

- `options`: `MotionzOptions`
- Mendaftarkan animasi `fade` sebagai default.
- Memulai observasi elemen dengan `data-motionz` / `data-motion`.

### `Motionz.refresh()`

- Memuat ulang target elemen dan observer.

### `Motionz.destroy()`

- Menghentikan observer dan membersihkan state.

### `Motionz.register(name, animation)`

- `name`: nama animasi.
- `animation`: fungsi `(element, options) => void`.

## Opsi `MotionzOptions`

| Opsi        | Tipe      | Default    | Keterangan                         |
| ----------- | --------- | ---------- | ---------------------------------- |
| `once`      | `boolean` | `true`     | Hanya animasi sekali per elemen    |
| `offset`    | `number`  | `0`        | Root margin vertikal untuk trigger |
| `duration`  | `number`  | `600`      | Durasi animasi dalam ms            |
| `delay`     | `number`  | `0`        | Delay animasi dalam ms             |
| `easing`    | `string`  | `ease-out` | Fungsi easing CSS                  |
| `animation` | `string`  | `fade`     | Nama animasi default               |

## Struktur Proyek

- `src/index.ts` — titik masuk library
- `src/core/Motionz.ts` — API publik
- `src/core/Engine.ts` — logika utama dan observer
- `src/core/Observer.ts` — wrapper IntersectionObserver
- `src/core/Parser.ts` — parsing atribut data
- `src/core/Registry.ts` — registry animasi
- `src/animations/fade.ts` — animasi bawaan
- `src/types/MotionzOptions.ts` — tipe TypeScript
- `src/styles/motionz.css` — utilitas gaya animasi

## Build

```bash
npm run build
```

## Pengujian

```bash
npm test
```

## CDN / Tanpa Install

### Import ESM langsung

Jika kamu ingin menggunakan Motionz tanpa instalasi npm, gunakan CDN modul ES
seperti berikut:

```html
<script type="module">
  import Motionz from "https://cdn.jsdelivr.net/npm/motionz@0.0.1/dist/motionz.es.js";

  Motionz.init();
</script>
```

> Ganti versi `0.0.1` dengan versi yang sesuai bila sudah dipublikasikan.

### Script tag UMD

Untuk penggunaan langsung tanpa `import`, gunakan bundle UMD dan akses variabel
global `Motionz`:

```html
<script src="https://cdn.jsdelivr.net/npm/motionz@0.0.1/dist/motionz.umd.js"></script>
<script>
  Motionz.init();
</script>
```

## Catatan

Jika menggunakan bundler modern, pastikan library diimport sebagai modul ES.
