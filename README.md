# Daily Spend App

Tools: Express, Postgres, React

# Design

---

## User Story

1. Ingin bisa membuat catatan pengeluaran harian dengan mudah
2. Ingin memiliki daftar wallet dan jumlah yang dimiliki
3. Ingin melihat transaksi dari wallet tersebut
4. Ingin bisa mengedit jumlah uang di wallet
5. Ingin melihat total uang dari seluruh wallet
6. Dapat mencatat pengeluaran dalam sehari
7. Dapat menghapus pengeluaran jika tidak sesuai
8. Dapat menampilkan pengeluaran hari ini

## System

---

1. Terdapat `WALLET` Create, Read, Update, Delete
    - Attribut → nama, jumlah diawal bulan, jumlah diakhir bulan
    - Modifikasi nilai awal bulan dan menyesuaikan nilai akhir bulan dengan awal bulan
        - Jadi saat user mengubah nilai awal bulan terdapat button untuk mereset nilai akhir bulannya agar sama dengan nilai awal bulan
    - Nilai akhir bulan selalu berubah sesuai pengeluaran dari wallet tersebut
2. Terdapat `SPEND` Create, Read, Delete
    - Attribut → deskripsi, jumlah pengeluaran, id_wallet, tanggal pengeluaran
    - Saat pengeluaran dibuat akan mengurangi jumlah akhir bulan dari wallet
    - Pengeluaran dapat dihapus bila tidak sesuai keinginan user

# Client

---

# Server

---

## Overview

- Framework → Express js
- Database → Postgres

## Api List

### Wallet

- `GET /wallets` Get all wallet data
- `GET /wallets/:id` Get wallet by id
- `POST /wallets` Create new wallet data
    - Req
        - walletName
        - walletAmount

### Spend

- `GET /spends` Get all spends data
- `POST /spends` Create new spend data