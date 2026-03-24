import { Input, Card, Row, Col, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { mockFields } from '../data/mockData';

const { Title, Text } = Typography;

export default function HomePage() {
  const featuredFields = mockFields.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white',
        marginBottom: 40
      }}>
        <Title style={{ color: 'white', fontSize: 42 }}>
          Đặt Sân Bóng Dễ Dàng
        </Title>
        <Text style={{ color: 'white', fontSize: 18 }}>
          Tìm và đặt sân bóng yêu thích của bạn chỉ với vài cú click
        </Text>
        
        <div style={{ marginTop: 30, maxWidth: 600, margin: '30px auto 0' }}>
          <Input 
            size="large"
            placeholder="Tìm sân bóng theo tên, khu vực..."
            prefix={<SearchOutlined />}
          />
        </div>
      </div>

      {/* Featured Fields */}
      <div style={{ padding: '0 20px' }}>
        <Title level={2}>Sân Bóng Nổi Bật</Title>
        <Row gutter={[16, 16]}>
          {featuredFields.map(field => (
            <Col xs={24} sm={12} md={8} key={field.id}>
              <Link to={`/fields/${field.id}`}>
                <Card
                  hoverable
                  cover={
                    <img 
                      alt={field.name}
                      src={field.images[0]}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  }
                >
                  <Card.Meta
                    title={field.name}
                    description={
                      <>
                        <div>{field.address}</div>
                        <div style={{ marginTop: 8, color: '#1890ff', fontWeight: 'bold' }}>
                          {field.pricePerHour.toLocaleString('vi-VN')} đ/giờ
                        </div>
                      </>
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
