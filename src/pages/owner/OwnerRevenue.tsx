import { useEffect, useMemo, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Alert } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { ownerAPI } from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardSkeleton } from '../../components/LoadingSkeleton';

const { Title, Text } = Typography;

export default function OwnerRevenue() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await ownerAPI.getFieldBookings();
        if (response.success) {
          setBookings(response.data.map((b: any) => ({ ...b, status: b.status.toLowerCase(), date: b.bookingDate })));
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải doanh thu');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const paidBookings = bookings.filter((b) => b.status === 'confirmed' || b.status === 'completed');
  const totalRevenue = paidBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const revenueByField = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of paidBookings) {
      map.set(b.fieldName, (map.get(b.fieldName) || 0) + b.totalPrice);
    }
    return Array.from(map.entries()).map(([name, revenue]) => ({ name, revenue }));
  }, [paidBookings]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0 }}>Thống kê doanh thu</Title>
        <Text type="secondary">Dữ liệu doanh thu từ booking đã xác nhận</Text>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic title="Tổng Doanh Thu" value={totalRevenue} prefix={<DollarOutlined style={{ color: '#10B981' }} />} suffix="đ" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 16 }}>
            <Statistic title="Booking tính doanh thu" value={paidBookings.length} />
          </Card>
        </Col>
      </Row>

      <Card title="Doanh thu theo sân" style={{ borderRadius: 16, marginTop: 24 }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={revenueByField}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#10B981" name="Doanh thu (đ)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
