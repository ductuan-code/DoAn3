# 📋 FOOTBALL BOOKING API DOCUMENTATION

## 🌐 **BASE INFORMATION**
- **Base URL:** `https://localhost:7147` hoặc `http://localhost:5120`
- **Swagger UI:** `https://localhost:7147/swagger`
- **Authentication:** JWT Bearer Token
- **Content-Type:** `application/json`

## 🔐 **AUTHENTICATION**

### 1. Đăng ký tài khoản
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "fullName": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0123456789",
  "password": "password123",
  "role": "USER" // USER, OWNER, ADMIN
}

Response:
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "id": 1,
    "fullName": "Nguyễn Văn A",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

### 2. Đăng nhập
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "fullName": "Nguyễn Văn A",
      "email": "user@example.com",
      "role": "USER"
    }
  }
}
```

### 3. Lấy thông tin user hiện tại
```
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "Nguyễn Văn A",
    "email": "user@example.com",
    "phone": "0123456789",
    "role": "USER",
    "status": "ACTIVE"
  }
}
```

### 4. Đăng xuất
```
POST /api/auth/logout
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

## ⚽ **QUẢN LÝ SÂN BÓNG**

### 1. Lấy danh sách sân (có filter)
```
GET /api/fields?keyword=sân&district=Quận 1&fieldType=1&page=1

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sân bóng ABC",
      "description": "Sân bóng chất lượng cao",
      "address": "123 Đường ABC",
      "district": "Quận 1",
      "city": "TP.HCM",
      "fieldType": 1,
      "openTime": "06:00:00",
      "closeTime": "22:00:00",
      "status": "ACTIVE",
      "images": ["url1.jpg", "url2.jpg"],
      "priceRules": [
        {
          "dayOfWeek": 1,
          "startTime": "06:00:00",
          "endTime": "18:00:00",
          "pricePerHour": 200000
        }
      ]
    }
  ]
}
```

### 2. Chi tiết sân
```
GET /api/fields/{id}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Sân bóng ABC",
    "description": "Sân bóng chất lượng cao",
    "address": "123 Đường ABC",
    "district": "Quận 1",
    "city": "TP.HCM",
    "fieldType": 1,
    "openTime": "06:00:00",
    "closeTime": "22:00:00",
    "status": "ACTIVE",
    "images": ["url1.jpg", "url2.jpg"],
    "priceRules": [...],
    "reviews": [...]
  }
}
```

### 3. Lịch trống của sân theo ngày
```
GET /api/fields/{id}/schedule?date=2026-04-25

Response:
{
  "success": true,
  "data": {
    "fieldId": 1,
    "date": "2026-04-25",
    "availableSlots": [
      {
        "startTime": "06:00:00",
        "endTime": "07:00:00",
        "price": 200000,
        "isAvailable": true
      },
      {
        "startTime": "07:00:00",
        "endTime": "08:00:00",
        "price": 200000,
        "isAvailable": false
      }
    ]
  }
}
```

## 📅 **QUẢN LÝ BOOKING**

### 1. Tạo booking mới
```
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "fieldId": 1,
  "bookingDate": "2026-04-25",
  "startTime": "06:00:00",
  "endTime": "08:00:00",
  "note": "Đặt sân cho team công ty"
}

Response:
{
  "success": true,
  "message": "Đặt sân thành công",
  "data": {
    "id": 1,
    "fieldId": 1,
    "fieldName": "Sân bóng ABC",
    "bookingDate": "2026-04-25",
    "startTime": "06:00:00",
    "endTime": "08:00:00",
    "totalPrice": 400000,
    "status": "PENDING",
    "paymentStatus": "UNPAID"
  }
}
```

### 2. Lấy booking của tôi
```
GET /api/bookings/my
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "fieldId": 1,
      "fieldName": "Sân bóng ABC",
      "bookingDate": "2026-04-25",
      "startTime": "06:00:00",
      "endTime": "08:00:00",
      "totalPrice": 400000,
      "status": "CONFIRMED",
      "paymentStatus": "PAID",
      "createdAt": "2026-04-24T10:30:00"
    }
  ]
}
```

### 3. Chi tiết booking
```
GET /api/bookings/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "field": {
      "id": 1,
      "name": "Sân bóng ABC",
      "address": "123 Đường ABC"
    },
    "bookingDate": "2026-04-25",
    "startTime": "06:00:00",
    "endTime": "08:00:00",
    "totalPrice": 400000,
    "status": "CONFIRMED",
    "paymentStatus": "PAID",
    "note": "Đặt sân cho team công ty",
    "payment": {
      "method": "VNPAY",
      "amount": 400000,
      "paidAt": "2026-04-24T10:35:00"
    }
  }
}
```

### 4. Hủy booking
```
PUT /api/bookings/{id}/cancel
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Hủy booking thành công"
}
```

## 💳 **THANH TOÁN**

### 1. Thanh toán booking
```
POST /api/payments
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "bookingId": 1,
  "method": "VNPAY" // CASH, BANK_TRANSFER, MOMO, VNPAY, ZALOPAY
}

Response:
{
  "success": true,
  "message": "Thanh toán thành công",
  "data": {
    "paymentId": 1,
    "bookingId": 1,
    "method": "VNPAY",
    "amount": 400000,
    "status": "SUCCESS",
    "transactionCode": "TXN123456789",
    "paidAt": "2026-04-24T10:35:00"
  }
}
```

## 👑 **OWNER APIs** (Role: OWNER)

### 1. Tạo sân mới
```
POST /api/owner/fields
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "name": "Sân bóng XYZ",
  "description": "Sân bóng chất lượng",
  "address": "456 Đường XYZ",
  "district": "Quận 2",
  "city": "TP.HCM",
  "fieldType": 1,
  "openTime": "06:00:00",
  "closeTime": "22:00:00",
  "images": ["url1.jpg", "url2.jpg"],
  "priceRules": [
    {
      "dayOfWeek": 1,
      "startTime": "06:00:00",
      "endTime": "18:00:00",
      "pricePerHour": 200000
    }
  ]
}
```

### 2. Lấy sân của tôi
```
GET /api/owner/fields
Authorization: Bearer {token}
```

### 3. Lấy booking của sân
```
GET /api/owner/bookings?fieldId=1&date=2026-04-25
Authorization: Bearer {token}
```

### 4. Xác nhận booking
```
PUT /api/owner/bookings/{id}/confirm
Authorization: Bearer {token}
```

### 5. Khóa khung giờ
```
POST /api/owner/block-slot
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "fieldId": 1,
  "blockDate": "2026-04-25",
  "startTime": "12:00:00",
  "endTime": "14:00:00",
  "reason": "Bảo trì sân"
}
```

## 🛡️ **ADMIN APIs** (Role: ADMIN)

### 1. Quản lý users
```
GET /api/admin/users?page=1
Authorization: Bearer {token}
```

### 2. Khóa user
```
PUT /api/admin/users/{id}/block
Authorization: Bearer {token}
```

### 3. Quản lý sân
```
GET /api/admin/fields?page=1
Authorization: Bearer {token}
```

### 4. Xóa sân
```
DELETE /api/admin/fields/{id}
Authorization: Bearer {token}
```

### 5. Báo cáo doanh thu
```
GET /api/admin/report/revenue?startDate=2026-04-01&endDate=2026-04-30
Authorization: Bearer {token}
```

### 6. Báo cáo booking
```
GET /api/admin/report/bookings?startDate=2026-04-01&endDate=2026-04-30
Authorization: Bearer {token}
```

## 🎯 **STATUS CODES**

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Internal Server Error

## 🔑 **AUTHENTICATION FLOW**

1. **Đăng ký/Đăng nhập** → Nhận JWT token
2. **Gửi token** trong header: `Authorization: Bearer {token}`
3. **Token expires** → Đăng nhập lại để lấy token mới

## 📝 **NOTES**

- Tất cả datetime format: `YYYY-MM-DDTHH:mm:ss`
- Tất cả date format: `YYYY-MM-DD`
- Tất cả time format: `HH:mm:ss`
- Pagination: `page` parameter (default = 1)
- Role hierarchy: `USER` < `OWNER` < `ADMIN`