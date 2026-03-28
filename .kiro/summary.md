# ⚡ FOOTBALL BOOKING - SUMMARY

## 🎯 Tính năng chính

### Multi-slot Booking
- Chọn nhiều khung giờ liên tiếp
- Tự động tính tổng tiền
- Highlight slots đã chọn

### State Management
- **AuthContext**: Login/Logout + localStorage
- **BookingContext**: Quản lý bookings + localStorage
- **useBookingSelection**: Custom hook quản lý logic chọn slots

### Components
- TimeSlotTable: Multi-select thông minh
- BookingModal: Hiển thị chi tiết booking
- MainLayout: User dropdown menu

---

## 📁 Cấu trúc code

```
src/
├── contexts/
│   ├── AuthContext.tsx
│   └── BookingContext.tsx
├── hooks/
│   └── useBookingSelection.ts
├── components/
│   ├── TimeSlotTable.tsx
│   └── BookingModal.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── FieldListPage.tsx
│   ├── FieldDetailPage.tsx
│   ├── LoginPage.tsx
│   └── MyBookingsPage.tsx
└── data/
    └── mockData.ts
```

---

## 🚀 Flow đặt sân

1. Login → Lưu user vào localStorage
2. Chọn sân → Xem lịch trống
3. Chọn slots liên tiếp → Tính tổng tiền
4. Đặt sân → Lưu bookings vào localStorage
5. Xem "Lịch đặt của tôi"

---

## 🧪 Test nhanh

- Login với email bất kỳ
- Đặt nhiều slots liên tiếp
- Refresh page → Data vẫn còn
- Slot đã đặt bị disable

---

## 🔧 Khi có Backend

Thay mock data bằng API calls:
- `AuthContext.login()` → API
- `BookingContext.addBooking()` → API
- Fetch real-time availability

---

**Chạy:** `npm start`
