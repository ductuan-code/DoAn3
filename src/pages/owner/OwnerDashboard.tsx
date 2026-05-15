import { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Table, Tag, Alert } from 'antd';
import { ShopOutlined, CalendarOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { ownerAPI } from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardSkeleton } from '../../components/LoadingSkeleton';

const { Title, Text } = Typography;

export default function OwnerDashboard() {
  const [fields, setFields] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [fieldsRes, bookingsRes] = await Promise.all([ownerAPI.getMyFields(), ownerAPI.getFieldBookings()]);
        if (fieldsRes.success) setFields(fieldsRes.data);
        if (bookingsRes.success) {
          setBookings(bookingsRes.data.map((b: any) => ({ ...b, status: b.status.toLowerCase(), date: b.bookingDate })));
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải dashboard chủ sân');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const totalRevenue = bookings.filter((b) => b.status === 'confirmed' || b.status === 'completed').reduce((sum, b) => sum + b.totalPrice, 0);
  const revenueByDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of bookings) {
      if (b.status !== 'confirmed' && b.status !== 'completed') continue;
      const key = new Date(b.date).toLocaleDateString('vi-VN');
      map.set(key, (map.get(key) || 0) + b.totalPrice);
    }
    return Array.from(map.entries()).map(([date, revenue]) => ({ date, revenue }));
  }, [bookings]);
  const recentBookings = [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const columns = [
    { title: 'Sân', dataIndex: 'fieldName', key: 'fieldName' },
    { title: 'Ngày', dataIndex: 'date', key: 'date', render: (date: string) => new Date(date).toLocaleDateString('vi-VN') },
    { title: 'Giờ', key: 'time', render: (_: any, record: any) => `${record.startTime} - ${record.endTime}` },
    { title: 'Giá', dataIndex: 'totalPrice', key: 'price', render: (price: number) => <Text strong style={{ color: '#10B981' }}>{price.toLocaleString('vi-VN')} đ</Text> },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: any = { pending: 'orange', confirmed: 'green', cancelled: 'red', completed: 'blue' };
        const textMap: any = { pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', cancelled: 'Đã hủy', completed: 'Hoàn thành' };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      }
    }
  ];

  if (loading) return <DashboardSkeleton />;

  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0 }}>Dashboard Chủ Sân</Title>
        <Text type="secondary">Tổng quan hoạt động kinh doanh</Text>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}><Card style={{ borderRadius: 16 }}><Statistic title="Tổng Sân" value={fields.length} prefix={<ShopOutlined style={{ color: '#10B981' }} />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card style={{ borderRadius: 16 }}><Statistic title="Tổng Booking" value={totalBookings} prefix={<CalendarOutlined style={{ color: '#3b82f6' }} />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card style={{ borderRadius: 16 }}><Statistic title="Chờ Xác Nhận" value={pendingBookings} prefix={<CheckCircleOutlined style={{ color: '#f59e0b' }} />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card style={{ borderRadius: 16 }}><Statistic title="Doanh Thu" value={totalRevenue} prefix={<DollarOutlined style={{ color: '#10B981' }} />} valueStyle={{ fontSize: '20px' }} /><div style={{ fontSize: '14px', color: '#666', marginTop: 4 }}>VNĐ</div></Card></Col>
      </Row>

      <Card title="Doanh thu theo ngày" style={{ marginTop: 16, borderRadius: 16 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueByDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Doanh thu (đ)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Booking gần đây" style={{ marginTop: 16, borderRadius: 16 }}>
        <Table dataSource={recentBookings} columns={columns} rowKey="id" pagination={false} />
      </Card>
    </div>
  );
}
