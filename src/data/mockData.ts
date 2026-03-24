import { FootballField, TimeSlot, Booking } from '../types';

export const mockFields: FootballField[] = [
  {
    id: '1',
    name: 'Sân Bóng Thể Thao Quận 1',
    address: '123 Nguyễn Huệ, Quận 1',
    district: 'Quận 1',
    fieldType: '5v5',
    pricePerHour: 300000,
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'
    ],
    description: 'Sân bóng chất lượng cao, cỏ nhân tạo mới, đầy đủ tiện nghi',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Nước uống'],
    rating: 4.5,
    ownerId: 'owner1'
  },
  {
    id: '2',
    name: 'Sân Bóng Phú Nhuận',
    address: '456 Phan Xích Long, Phú Nhuận',
    district: 'Phú Nhuận',
    fieldType: '7v7',
    pricePerHour: 500000,
    images: [
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800'
    ],
    description: 'Sân rộng rãi, thoáng mát, phù hợp cho các trận đấu lớn',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Căng tin'],
    rating: 4.8,
    ownerId: 'owner2'
  },
  {
    id: '3',
    name: 'Sân Bóng Tân Bình',
    address: '789 Cộng Hòa, Tân Bình',
    district: 'Tân Bình',
    fieldType: '5v5',
    pricePerHour: 250000,
    images: [
      'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800'
    ],
    description: 'Giá rẻ, chất lượng tốt, gần sân bay',
    amenities: ['Đèn chiếu sáng', 'Bãi đỗ xe'],
    rating: 4.2,
    ownerId: 'owner1'
  }
];

export const mockTimeSlots: TimeSlot[] = [
  // Sân 1
  { id: 'ts1', fieldId: '1', date: '2026-03-25', startTime: '06:00', endTime: '07:00', price: 300000, status: 'available' },
  { id: 'ts2', fieldId: '1', date: '2026-03-25', startTime: '07:00', endTime: '08:00', price: 300000, status: 'booked' },
  { id: 'ts3', fieldId: '1', date: '2026-03-25', startTime: '17:00', endTime: '18:00', price: 400000, status: 'available' },
  { id: 'ts4', fieldId: '1', date: '2026-03-25', startTime: '18:00', endTime: '19:00', price: 400000, status: 'available' },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    userId: 'user1',
    fieldId: '1',
    timeSlotId: 'ts2',
    date: '2026-03-25',
    startTime: '07:00',
    endTime: '08:00',
    totalPrice: 300000,
    status: 'confirmed',
    createdAt: '2026-03-20T10:00:00Z',
    fieldName: 'Sân Bóng Thể Thao Quận 1'
  }
];
