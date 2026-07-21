# mtnz

mtnz adalah library TypeScript ringan untuk membuat animasi elemen DOM masuk
ke viewport menggunakan `IntersectionObserver`.

## Fitur

- Animasi `fade` otomatis ketika elemen muncul di viewport
- Registrasi animasi kustom
- Dukungan opsi global dan atribut `data-` pada elemen
- API sederhana: `init`, `refresh`, `destroy`, `register`

## Instalasi

> Jika menggunakan npm

```bash
npm install mntz-kit
```

> Jika menggunakan Yarn

```bash
yarn add mntz-kit
```

## Penggunaan

### 1. Inisialisasi dasar

```ts
import mtnz from "mntz-kit";

mtnz.init();
```

### 2. Inisialisasi dengan opsi global

```ts
mtnz.init({
   once: true,
   offset: 50,
   duration: 800,
   delay: 100,
   easing: "ease-out",
});
```

### 3. Menggunakan atribut HTML

Gunakan atribut `data-mtnz` atau `data-motion` pada elemen untuk memicu
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
mtnz.register("slide", (element, options) => {
   element.style.opacity = "0";
   element.style.transform = "translateX(-24px)";
   element.style.transition = `opacity ${options.duration ?? 600}ms ${options.easing ?? "ease-out"} ${options.delay ?? 0}ms, transform ${options.duration ?? 600}ms ${options.easing ?? "ease-out"} ${options.delay ?? 0}ms`;

   requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translateX(0)";
   });
});

mtnz.init();
```

Lalu di HTML:

```html
<div data-motion="slide">Slide in</div>
```

## API

### `mtnz.init(options?)`

- `options`: `mtnzOptions`
- Mendaftarkan animasi `fade` sebagai default.
- Memulai observasi elemen dengan `data-mtnz` / `data-motion`.

### `mtnz.refresh()`

- Memuat ulang target elemen dan observer.

### `mtnz.destroy()`

- Menghentikan observer dan membersihkan state.

### `mtnz.register(name, animation)`

- `name`: nama animasi.
- `animation`: fungsi `(element, options) => void`.

## Opsi `mtnzOptions`

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
- `src/core/mtnz.ts` — API publik
- `src/core/Engine.ts` — logika utama dan observer
- `src/core/Observer.ts` — wrapper IntersectionObserver
- `src/core/Parser.ts` — parsing atribut data
- `src/core/Registry.ts` — registry animasi
- `src/animations/fade.ts` — animasi bawaan
- `src/types/mtnzOptions.ts` — tipe TypeScript
- `src/styles/mtnz.css` — utilitas gaya animasi

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

Jika kamu ingin menggunakan mtnz tanpa instalasi npm, gunakan CDN modul ES
seperti berikut:

```html
<script type="module">
   import mtnz from "https://cdn.jsdelivr.net/npm/mntz-kit@0.x.x/dist/mtnz.es.js";

   mtnz.init();
</script>
```

> Ganti versi `0.0.1` dengan versi yang sesuai bila sudah dipublikasikan.

### Script tag UMD

Untuk penggunaan langsung tanpa `import`, gunakan bundle UMD dan akses variabel
global `mtnz`:

```html
<script src="https://cdn.jsdelivr.net/npm/mntz-kit@0.x.x/dist/mtnz.umd.js"></script>
<script>
   mtnz.init();
</script>
```

## Catatan

Jika menggunakan bundler modern, pastikan library diimport sebagai modul ES.
