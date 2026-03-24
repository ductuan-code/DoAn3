import { Layout, Menu } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  HomeOutlined, 
  UnorderedListOutlined, 
  CalendarOutlined,
  LoginOutlined,
  UserAddOutlined
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/', label: 'Trang chủ', icon: <HomeOutlined /> },
    { key: '/fields', label: 'Danh sách sân', icon: <UnorderedListOutlined /> },
    { key: '/my-bookings', label: 'Lịch đặt của tôi', icon: <CalendarOutlined /> },
    { key: '/login', label: 'Đăng nhập', icon: <LoginOutlined /> },
    { key: '/register', label: 'Đăng ký', icon: <UserAddOutlined /> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ 
          color: "white", 
          padding: 20, 
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          ⚽ Football
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Header style={{ 
          background: "#fff", 
          paddingLeft: 20,
          fontSize: 20,
          fontWeight: 'bold'
        }}>
          Hệ Thống Đặt Sân Bóng
        </Header>

        <Content style={{ margin: 24 }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Football Booking System ©2026 - Nguyễn Đức Tuấn
        </Footer>
      </Layout>
    </Layout>
  );
}
