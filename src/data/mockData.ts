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
  },
  {
    id: '4',
    name: 'Sân Bóng Bình Thạnh',
    address: '234 Xô Viết Nghệ Tĩnh, Bình Thạnh',
    district: 'Bình Thạnh',
    fieldType: '7v7',
    pricePerHour: 450000,
    images: [
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800'
    ],
    description: 'Sân đẹp, cỏ mềm, view đẹp, có mái che',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Căng tin', 'Wifi'],
    rating: 4.7,
    ownerId: 'owner2'
  },
  {
    id: '5',
    name: 'Sân Bóng Thủ Đức',
    address: '567 Võ Văn Ngân, Thủ Đức',
    district: 'Thủ Đức',
    fieldType: '5v5',
    pricePerHour: 280000,
    images: [
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800'
    ],
    description: 'Gần khu đại học, giá sinh viên, sân mới xây',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe'],
    rating: 4.3,
    ownerId: 'owner1'
  },
  {
    id: '6',
    name: 'Sân Bóng Quận 3',
    address: '890 Điện Biên Phủ, Quận 3',
    district: 'Quận 3',
    fieldType: '5v5',
    pricePerHour: 320000,
    images: [
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'
    ],
    description: 'Trung tâm thành phố, tiện di chuyển, cỏ nhân tạo cao cấp',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Nước uống', 'Wifi'],
    rating: 4.6,
    ownerId: 'owner2'
  },
  {
    id: '7',
    name: 'Sân Bóng Gò Vấp',
    address: '123 Quang Trung, Gò Vấp',
    district: 'Gò Vấp',
    fieldType: '7v7',
    pricePerHour: 480000,
    images: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800'
    ],
    description: 'Sân rộng, có khán đài, phù hợp tổ chức giải đấu',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Căng tin', 'Khán đài'],
    rating: 4.9,
    ownerId: 'owner1'
  },
  {
    id: '8',
    name: 'Sân Bóng Quận 7',
    address: '456 Nguyễn Thị Thập, Quận 7',
    district: 'Quận 7',
    fieldType: '5v5',
    pricePerHour: 350000,
    images: [
      'https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800'
    ],
    description: 'Khu Phú Mỹ Hưng, sân đẹp, tiện nghi hiện đại',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Nước uống', 'Wifi', 'Điều hòa'],
    rating: 4.8,
    ownerId: 'owner2'
  },
  {
    id: '9',
    name: 'Sân Bóng Quận 10',
    address: '789 Ba Tháng Hai, Quận 10',
    district: 'Quận 10',
    fieldType: '5v5',
    pricePerHour: 270000,
    images: [
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800'
    ],
    description: 'Giá tốt, chất lượng ổn, phù hợp đá thường xuyên',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe'],
    rating: 4.1,
    ownerId: 'owner1'
  },
  {
    id: '10',
    name: 'Sân Bóng Quận 12',
    address: '234 Tô Ký, Quận 12',
    district: 'Quận 12',
    fieldType: '7v7',
    pricePerHour: 420000,
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800'
    ],
    description: 'Sân mới, cỏ đẹp, không gian thoáng đãng',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Căng tin'],
    rating: 4.4,
    ownerId: 'owner2'
  },
  {
    id: '11',
    name: 'Sân Bóng Bình Tân',
    address: '567 Lê Văn Quới, Bình Tân',
    district: 'Bình Tân',
    fieldType: '5v5',
    pricePerHour: 260000,
    images: [
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800'
    ],
    description: 'Giá rẻ nhất khu vực, sân sạch sẽ, đầy đủ tiện nghi',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Nước uống'],
    rating: 4.0,
    ownerId: 'owner1'
  },
  {
    id: '12',
    name: 'Sân Bóng Tân Phú',
    address: '890 Lũy Bán Bích, Tân Phú',
    district: 'Tân Phú',
    fieldType: '5v5',
    pricePerHour: 290000,
    images: [
      'https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=800'
    ],
    description: 'Sân đẹp, cỏ mềm, có mái che một phần',
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Mái che'],
    rating: 4.5,
    ownerId: 'owner2'
  }
];

export const mockTimeSlots: TimeSlot[] = [
  // Sân 1 - Ngày 25/03/2026
  { id: 'ts1-1', fieldId: '1', date: '2026-03-25', startTime: '06:00', endTime: '07:00', price: 300000, status: 'available' },
  { id: 'ts1-2', fieldId: '1', date: '2026-03-25', startTime: '07:00', endTime: '08:00', price: 300000, status: 'available' },
  { id: 'ts1-3', fieldId: '1', date: '2026-03-25', startTime: '08:00', endTime: '09:00', price: 350000, status: 'available' },
  { id: 'ts1-4', fieldId: '1', date: '2026-03-25', startTime: '09:00', endTime: '10:00', price: 350000, status: 'booked' },
  { id: 'ts1-5', fieldId: '1', date: '2026-03-25', startTime: '10:00', endTime: '11:00', price: 350000, status: 'available' },
  { id: 'ts1-6', fieldId: '1', date: '2026-03-25', startTime: '17:00', endTime: '18:00', price: 400000, status: 'available' },
  { id: 'ts1-7', fieldId: '1', date: '2026-03-25', startTime: '18:00', endTime: '19:00', price: 400000, status: 'available' },
  { id: 'ts1-8', fieldId: '1', date: '2026-03-25', startTime: '19:00', endTime: '20:00', price: 450000, status: 'available' },
  { id: 'ts1-9', fieldId: '1', date: '2026-03-25', startTime: '20:00', endTime: '21:00', price: 450000, status: 'available' },
  
  // Sân 2
  { id: 'ts2-1', fieldId: '2', date: '2026-03-25', startTime: '06:00', endTime: '07:00', price: 500000, status: 'available' },
  { id: 'ts2-2', fieldId: '2', date: '2026-03-25', startTime: '07:00', endTime: '08:00', price: 500000, status: 'available' },
  { id: 'ts2-3', fieldId: '2', date: '2026-03-25', startTime: '17:00', endTime: '18:00', price: 600000, status: 'available' },
  
  // Sân 3
  { id: 'ts3-1', fieldId: '3', date: '2026-03-25', startTime: '06:00', endTime: '07:00', price: 250000, status: 'available' },
  { id: 'ts3-2', fieldId: '3', date: '2026-03-25', startTime: '07:00', endTime: '08:00', price: 250000, status: 'available' },
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
