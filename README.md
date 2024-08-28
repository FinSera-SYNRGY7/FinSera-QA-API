# FinSera-QA-API

Merupakan repository GitHub untuk menguji API pada proyek FinSera. Repository ini berfokus pada pengujian API menggunakan berbagai tools dan teknik untuk memastikan kualitas dan stabilitas layanan yang disediakan.

## Anggota Tim

- **Husain Abidin Widayat** - Tech Lead
- **Adrian Syah Abidin** - Anggota
- **Carel Putra Andino** - Anggota

## Tech Stack

Untuk mendukung pengujian API, repository ini menggunakan beberapa alat dan teknologi sebagai berikut:

- **Postman**: Digunakan untuk pengujian API secara manual, membuat collection untuk request, dan mendokumentasikan API.
- **JMeter**: Digunakan untuk pengujian performa API dan mengukur beban yang dapat ditangani oleh API.
- **Newman**: Digunakan untuk menjalankan collection Postman dari command line dan mengotomatisasi pengujian API dalam berbagai lingkungan.

## Cara Menggunakan

### Menjalankan Pengujian dengan Postman

1. Buka Postman.
2. Import collection yang terdapat di folder `Postman Collection & Environment`.
3. Sesuaikan environment yang terdapat pada folder sebelumnya.
4. Jalankan request yang ada di dalam collection untuk menguji API.

### Menjalankan Pengujian dengan JMeter

1. Buka JMeter.
2. Import file JMeter dari folder `Performance Testing API`.
3. Konfigurasi pengujian sesuai kebutuhan (jumlah thread, ramp-up period, dll.).
4. Jalankan pengujian untuk melihat performa API.

### Menjalankan Pengujian dengan Newman

1. Pastikan Newman telah terinstal di lingkungan Anda.
2. Gunakan perintah berikut untuk menjalankan collection Postman dari folder Automation API dengan Newman:

   ```bash
   newman run collections/<nama_collection>.json -e config/<nama_environment>.json -r cli,html --reporter-html-export reports/<nama_laporan>.html

