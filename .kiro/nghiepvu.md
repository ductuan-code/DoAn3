# 📘 FRONTEND PLAN – Football Field Booking System (React)

## 🎯 Mục tiêu Frontend

Xây dựng giao diện web đặt sân bóng bằng **React** với:

* UI hiện đại
* Component rõ ràng
* Routing chuẩn
* Có khả năng kết nối API backend sau này
* Trải nghiệm người dùng tốt

---

# 🧭 1. Page Flow (Luồng trang)

## Public Pages

* Home
* Field List
* Field Detail

## Authentication Pages

* Login
* Register

## User Pages

* My Bookings
* Profile (optional)

## Owner Pages (optional nâng cao)

* Owner Dashboard
* Manage Fields
* Manage Bookings

---

# 📄 2. Danh sách các Pages cần làm

## 🏠 Home Page

Chức năng:

* Banner giới thiệu
* Thanh tìm kiếm nhanh
* Danh sách sân nổi bật

UI gợi ý:

* Hero section
* Search bar
* Featured field cards

---

## ⚽ Field List Page

Chức năng:

* Hiển thị danh sách sân
* Filter theo:

  * khu vực
  * loại sân
  * giá

UI:

* Sidebar filter
* Grid field card

---

## 📋 Field Detail Page

Chức năng:

* Hiển thị:

  * ảnh sân
  * thông tin sân
  * bảng lịch
* Cho phép chọn giờ đặt sân

UI:

* Image gallery
* Info section
* Schedule table
* Booking button

---

## 🔐 Login Page

Chức năng:

* Đăng nhập
* Validate form

---

## 📝 Register Page

Chức năng:

* Đăng ký tài khoản
* Validate form

---

## 📅 My Bookings Page

Chức năng:

* Hiển thị danh sách booking
* Trạng thái booking
* Button huỷ booking

UI:

* Table / card list

---

# 🧩 3. Component Structure

## Layout Components

* Navbar
* Footer
* MainLayout

## Field Components

* FieldCard
* FieldGallery
* FieldInfo

## Booking Components

* ScheduleTable
* TimeSlot
* BookingModal

## Common Components

* SearchBar
* FilterPanel
* LoadingSpinner
* Pagination

---

# 🔀 4. Routing Structure (React Router)

* / → Home
* /fields → Field List
* /fields/:id → Field Detail
* /login → Login
* /register → Register
* /my-bookings → My Bookings

---

# 📦 5. State Management (Đề xuất)

Ban đầu:

* useState
* useEffect

Sau có thể nâng cấp:

* Context API
* Redux (optional)

---

# 🌐 6. API Integration Plan

Ban đầu:

* dùng mock data

Sau:

* gọi API thật:

GET /fields
GET /fields/:id
GET /fields/:id/schedule
POST /bookings

---

# 🎨 7. UI/UX Gợi ý

* Responsive design
* Card layout hiện đại
* Highlight giờ trống / giờ đã đặt
* Modal chọn giờ
* Toast thông báo

---

# 🧱 8. Folder Structure React (Gợi ý)

src/

* components/
* pages/
* layouts/
* services/
* hooks/
* utils/
* assets/

---

# 🚀 9. Lộ trình làm Frontend

Step 1: Setup project React
Step 2: Setup Router
Step 3: Làm Layout chung
Step 4: Làm Field List page
Step 5: Làm Field Detail page
Step 6: Làm Login/Register
Step 7: Làm My Bookings
Step 8: Connect API

---

# ✅ Kết quả mong muốn

* UI giống hệ thống thật
* Có thể demo booking flow
* Dễ mở rộng backend
* Đạt điểm cao môn React
