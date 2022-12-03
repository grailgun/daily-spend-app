# Daily Spend Apps

# Design

---

## User Story

1. Bisa membuat profil User
2. Ingin bisa membuat catatan pengeluaran harian
3. Ingin memiliki daftar wallet dan jumlah yang dimiliki
4. Bisa mengubah jumlah uang di wallet
5. Ingin melihat total uang dari seluruh wallet
6. Dapat mencatat pengeluaran dalam sehari
7. Dapat menghapus pengeluaran
8. Dapat menampilkan pengeluaran hari ini

## Requirements

1. **Create User** → Membuat akun baru
2. **Login User** → Masuk kedalam akun
3. **Create Wallet** → Membuat dompet dan jumlahnya
4. **Edit Wallet** → Mengubah jumlah uang dari suatu dompet
5. **Delete Wallet** → Menghapus dompet
6. **Create Spend** → Membuat pengeluaran yang ditujukan untuk suatu dompet
7. **Delete Spend** → Menghapus pengeluaran yang salah

# Server

---

## Overview

- Framework → Express js
- Database → Postgres

## Api List

- Endpoint : localhost:5000/api
- Authentication
    
    
    | Method | Endpoint | Description | Response |
    | --- | --- | --- | --- |
    | POST | /auth/signIn | Login user with Username and Password | token |
    | POST | /auth/signUp | Register user with Username and Password |  |
    | POST | /refreshToken | Request new access token when expired | token |
- **Wallet**
    
    
    | Method | Endpoint | Description |
    | --- | --- | --- |
    | GET | /wallets | Get all wallets of users |
    | GET | /wallets/:id | Get wallet by Id |
    | POST | /wallets | Add wallet and amount |
    | PUT | /wallets/:id | Modify wallet amount |
    | DELETE | /wallets/:id | Delete wallet by Id |
- **Spend**
    
    
    | Method | Endpoint | Description |
    | --- | --- | --- |
    | GET | /wallets | Get all wallets of users |
    | GET | /wallets/:id | Get wallet by Id |
    | POST | /wallets | Add wallet and amount |
    | PUT | /wallets/:id | Modify wallet amount |
    | DELETE | /wallets/:id | Delete wallet by Id |
    
    # How to use app
    
    1. Clone this project
    2. Install postgres
    3. Create new database in postgres
    4. Run `npm install` to install project dependencies
    5. Setup database configuration on `.env` file
        
        ```json
        # auth key
        SECRET_KEY = "YOUR SECRET KEY"
        REFRESH_KEY = "YOUR SECRET KEY"
        
        PORT = 5000
        
        DEV_DB_USERNAME = "username"
        DEV_DB_PASSWORD = "password"
        DEV_DB_NAME = "db name"
        DEV_DB_HOSTNAME = "127.0.0.1"
        
        CI_DB_USERNAME = "username"
        CI_DB_PASSWORD = "password"
        CI_DB_NAME = "db name"
        CI_DB_HOSTNAME = ""
        
        PROD_DB_USERNAME = "username"
        PROD_DB_PASSWORD = "password"
        PROD_DB_NAME = "db name"
        PROD_DB_HOSTNAME = ""
        ```
        
    6. Run `npm start` or `npm test` (if you have nodemon installed)
