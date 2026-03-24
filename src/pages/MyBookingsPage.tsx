import { Table, Tag, Button, Typography, message } from 'antd';
import { mockBookings } from '../data/mockData';
import { useState } from 'react';

const { Title } = Typography;

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);

  const handleCancel = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    ));
    message.success('Đã hủy lịch đặt sân');
  };

  const columns = [
    {
      title: 'Sân bóng',
      dataIndex: 'fieldName',
      key: 'fieldName',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Giờ',
      key: 'time',
      render: (_: any, record: any) => `${record.startTime} - ${record.endTime}`
    },
    {
      title: 'Giá',
      dataIndex: 'totalPrice',
      key: 'price',
      render: (price: number) => `${price.toLocaleString('vi-VN')} đ`
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: any = {
          pending: 'orange',
          confirmed: 'green',
          cancelled: 'red',
          completed: 'blue'
        };
        const textMap: any = {
          pending: 'Chờ xác nhận',
          confirmed: 'Đã xác nhận',
          cancelled: 'Đã hủy',
          completed: 'Hoàn thành'
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        record.status === 'confirmed' && (
          <Button 
            danger
            onClick={() => handleCancel(record.id)}
          >
            Hủy lịch
          </Button>
        )
      )
    }
  ];

  return (
    <div>
      <Title level={2}>Lịch Đặt Sân Của Tôi</Title>
      <Table 
        dataSource={bookings}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
}
