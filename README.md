# AmanahHaji

Laman web satu halaman untuk perkhidmatan pelaksanaan **Badal Haji** — dibina
sebagai laman pemasaran statik yang ringkas, telus dan profesional.

## Tujuan

Memberi penjelasan jelas mengenai perkhidmatan, proses pelaksanaan, pakej
harga tetap, dan testimoni — dengan satu laluan tindakan utama: menghubungi
pasukan melalui WhatsApp.

## Tech stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config via `@theme`)
- [lucide-react](https://lucide.dev/) untuk ikon

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # production build (tsc + vite build)
npm run lint     # ESLint
npm run preview  # preview production build
```

## Struktur

Keseluruhan halaman terkandung dalam [`src/App.tsx`](src/App.tsx):
navigasi, hero, tentang, proses, pakej & harga, sebab kepercayaan,
testimoni, seruan tindakan, dan footer. Gaya dikonfigurasi dalam
[`src/index.css`](src/index.css).

## Konfigurasi

Nombor WhatsApp dan mesej praisi ditetapkan sebagai konstanta di bahagian
atas `src/App.tsx` (`WHATSAPP_NUMBER`, `GENERAL_MESSAGE`, `PACKAGE_MESSAGE`).
