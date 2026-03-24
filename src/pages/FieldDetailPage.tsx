import { useParams } from 'react-router-dom';
import { Card, Row, Col, Typography, Tag, Button, Table, message } from 'antd';
import { mockFields, mockTimeSlots } from '../data/mockData';
import { useState } from 'react';

const { Title, Text } = Typography;

export default function FieldDetailPage() {
  const { id } = useParams<{ id: string }>();
  const field = mockFields.find(f => f.id === id);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!field) {
    return <div>Không tìm thấy sân bóng</div>;
  }

  const timeSlots = mockTimeSlots.filter(ts => ts.fieldId === id);

  const columns = [
    {
      title: 'Giờ',
      dataIndex: 'startTime',
      key: 'time',
      render: (_: any, record: any) => `${record.startTime} - ${record.endTime}`
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString('vi-VN')} đ`
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'available' ? 'green' : 'red'}>
          {status === 'available' ? 'Còn trống' : 'Đã đặt'}
        </Tag>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Button 
          type="primary"
          disabled={record.status !== 'available'}
          onClick={() => handleBooking(record.id)}
        >
          Đặt sân
        </Button>
      )
    }
  ];

  const handleBooking = (slotId: string) => {
    setSelectedSlot(slotId);
    message.success('Đặt sân thành công! (Demo)');
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
        <Title level={3}>Lịch Trống - Ngày 25/03/2026</Title>
        <Table 
          dataSource={timeSlots}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
}
