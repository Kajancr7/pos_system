# 🛒 POS System (Point of Sale)

A responsive **Point of Sale (POS) web application** built using HTML, CSS, JavaScript, PHP, and MySQL.
This system allows product management, sales tracking, and a dynamic dashboard with real-time data.

can access through here  https://kajancr7.github.io/pos_system/  (only front end here)
---

## 🚀 Features

* 📦 Product Management (Add / Delete / View)
* 🛒 Shopping Cart System
* 💰 Checkout & Order Processing
* 📊 Dashboard Analytics (Products, Orders, Sales)
* 📉 Inventory Management (Stock Updates)
* 🔍 Product Search Functionality
* 🎨 Responsive UI using Bootstrap

---

## 🛠️ Technologies Used

* **Frontend:** HTML, CSS, JavaScript, Bootstrap
* **Backend:** PHP
* **Database:** MySQL
* **Version Control:** Git & GitHub

---

## 📂 Project Structure

```
pos_system/
│
├── backend/
│   ├── add_product.php
│   ├── delete_product.php
│   ├── get_products.php
│   ├── get_dashboard.php
│   ├── checkout.php
│   └── db.php
│
├── images/
├── index.html
├── products.html
├── sales.html
├── script.js
├── style.css
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install Requirements

* Install **XAMPP / WAMP**
* Start **Apache** and **MySQL**

---

### 2️⃣ Move Project

Copy project folder to:

```
C:\xampp\htdocs\pos_system
```

---

### 3️⃣ Setup Database

Open **phpMyAdmin** and run:

```sql
CREATE DATABASE pos_system;

USE pos_system;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    qty INT
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 4️⃣ Run Project

Open browser:

```
http://localhost/pos_system
```


## 📌 Version History

* **v1** → Frontend only
* **v2** → Backend + Database integration

---


## 👤 Author

**Kajancr7**
GitHub: https://github.com/Kajancr7

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
