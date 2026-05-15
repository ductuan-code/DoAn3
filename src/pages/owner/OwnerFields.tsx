import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Tag, Button, Alert } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { ownerAPI } from '../../services/api';
import { FootballField } from '../../types';
import { FieldListSkeleton } from '../../components/LoadingSkeleton';

const { Title, Text } = Typography;

export default function OwnerFields() {
  const [fields, setFields] = useState<FootballField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFields = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await ownerAPI.getMyFields();
        if (response.success) {
          const mappedFields: FootballField[] = response.data.map((field: any) => ({
            id: field.id.toString(),
            name: field.name,
            address: field.address || '',
            district: field.district || '',
            fieldType: field.fieldType === 1 ? '5v5' : field.fieldType === 2 ? '7v7' : '11v11',
            pricePerHour: 200000,
            images: field.images || [],
            description: field.description || '',
            amenities: [],
            rating: field.averageRating || 0,
            ownerId: '',
          }));
          setFields(mappedFields);
        } else {
          setError(response.message || 'Không thể tải sân của bạn');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải sân của bạn');
      } finally {
        setLoading(false);
      }
    };

    loadFields();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Quản lý sân của tôi</Title>
          <Text type="secondary">Tổng số: {fields.length} sân</Text>
        </div>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      {loading ? (
        <FieldListSkeleton />
      ) : (
        <Row gutter={[24, 24]}>
          {fields.map((field) => (
            <Col xs={24} md={12} lg={8} key={field.id}>
              <Card
                cover={<img alt={field.name} src={field.images[0] || '/san-bong-da-truong-an.png'} style={{ height: 200, objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/san-bong-da-truong-an.png'; }} />}
                style={{ borderRadius: 16 }}
                actions={[
                  <Button type="text" icon={<EyeOutlined />} onClick={() => window.open(`/fields/${field.id}`, '_blank')}>
                    Xem
                  </Button>
                ]}
              >
                <Card.Meta
                  title={<span style={{ fontSize: 16, fontWeight: 600 }}>{field.name}</span>}
                  description={
                    <>
                      <div style={{ marginTop: 8 }}><Text type="secondary">{field.address}</Text></div>
                      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <Tag color="blue">{field.fieldType}</Tag>
                        <Tag color="green">⭐ {field.rating}</Tag>
                      </div>
                      <div style={{ marginTop: 12 }}><Tag color="green">Đang hoạt động</Tag></div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
