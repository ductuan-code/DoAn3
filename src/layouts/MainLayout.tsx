import { Layout, Menu, Button, Dropdown } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  HomeOutlined, 
  UnorderedListOutlined, 
  CalendarOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Header, Sider, Content, Footer } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: 'my-bookings',
      icon: <CalendarOutlined />,
      label: 'Lịch đặt của tôi',
      onClick: () => navigate('/my-bookings')
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout
    },
  ];

  const menuItems = [
    { key: '/', label: 'Trang chủ', icon: <HomeOutlined /> },
    { key: '/fields', label: 'Danh sách sân', icon: <UnorderedListOutlined /> },
    { key: '/my-bookings', label: 'Lịch đặt của tôi', icon: <CalendarOutlined /> },
    ...(!isAuthenticated ? [
      { key: '/login', label: 'Đăng nhập', icon: <LoginOutlined /> },
      { key: '/register', label: 'Đăng ký', icon: <UserAddOutlined /> },
    ] : [])
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
          paddingRight: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>
            Hệ Thống Đặt Sân Bóng
          </div>

          {isAuthenticated && user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" icon={<UserOutlined />}>
                {user.name}
              </Button>
            </Dropdown>
          ) : (
            <div>
              <Button onClick={() => navigate('/login')} style={{ marginRight: 8 }}>
                Đăng nhập
              </Button>
              <Button type="primary" onClick={() => navigate('/register')}>
                Đăng ký
              </Button>
            </div>
          )}
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
