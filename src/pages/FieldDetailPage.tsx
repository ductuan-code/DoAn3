import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Tag, Button, message } from 'antd';
import { mockFields, mockTimeSlots } from '../data/mockData';
import { useState } from 'react';
import TimeSlotTable from '../components/TimeSlotTable';
import BookingModal from '../components/BookingModal';
import { Booking } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { useBookingSelection } from '../hooks/useBookingSelection';

const { Title, Text } = Typography;

export default function FieldDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { bookings, addBooking } = useBooking();
  const [modalVisible, setModalVisible] = useState(false);
  
  // Custom hook quản lý booking selection
  const {
    selectedSlots,
    totalPrice,
    isSlotSelected,
    isSlotDisabled,
    toggleSlot,
    clearSelection,
    hasSelection
  } = useBookingSelection();

  const field = mockFields.find(f => f.id === id);

  if (!field) {
    return <div>Không tìm thấy sân bóng</div>;
  }

  const timeSlots = mockTimeSlots.filter(ts => ts.fieldId === id);
  
  // Lấy danh sách slot đã được đặt
  const bookedSlotIds = bookings
    .filter(b => b.fieldId === id && b.status !== 'cancelled')
    .map(b => b.timeSlotId);

  // Mở modal xác nhận
  const handleOpenModal = () => {
    if (!hasSelection) {
      message.warning('Vui lòng chọn ít nhất 1 khung giờ!');
      return;
    }

    if (!isAuthenticated) {
      message.warning('Vui lòng đăng nhập để đặt sân!');
      navigate('/login');
      return;
    }

    setModalVisible(true);
  };

  // Xác nhận booking
  const handleConfirmBooking = () => {
    if (!user) return;

    // Tạo booking cho từng slot
    selectedSlots.forEach(slot => {
      const newBooking: Booking = {
        id: 'booking-' + Date.now() + '-' + slot.id,
        userId: user.id,
        fieldId: field.id,
        timeSlotId: slot.id,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        totalPrice: slot.price,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        fieldName: field.name
      };
      
      addBooking(newBooking);
    });

    // Reset state
    clearSelection();
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <img 
            src={field.images[0]}
            alt={field.name}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Col>
        
        <Col xs={24} md={12}>
          <Title level={2}>{field.name}</Title>
          <Text type="secondary">{field.address}</Text>
          
          <div style={{ marginTop: 16 }}>
            <Tag color="blue">{field.fieldType}</Tag>
            <Tag color="green">⭐ {field.rating}</Tag>
          </div>

          <div style={{ marginTop: 16 }}>
            <Title level={4} style={{ color: '#1890ff' }}>
              {field.pricePerHour.toLocaleString('vi-VN')} đ/giờ
            </Title>
          </div>

          <div style={{ marginTop: 16 }}>
            <Text>{field.description}</Text>
          </div>

          <div style={{ marginTop: 16 }}>
            <Title level={5}>Tiện nghi:</Title>
            {field.amenities.map((amenity, index) => (
              <Tag key={index}>{amenity}</Tag>
            ))}
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: 40 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16 
        }}>
          <Title level={3} style={{ margin: 0 }}>
            Lịch Trống - Ngày 25/03/2026
          </Title>
          
          {hasSelection && (
            <Button 
              type="primary" 
              size="large"
              onClick={handleOpenModal}
            >
              Đặt sân ({selectedSlots.length} khung giờ)
            </Button>
          )}
        </div>

        <TimeSlotTable 
          timeSlots={timeSlots}
          selectedSlots={selectedSlots}
          bookedSlotIds={bookedSlotIds}
          isSlotSelected={isSlotSelected}
          isSlotDisabled={isSlotDisabled}
          onSelectSlot={toggleSlot}
        />
      </div>

      <BookingModal
        visible={modalVisible}
        onClose={handleCloseModal}
        timeSlots={selectedSlots}
        field={field}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}
