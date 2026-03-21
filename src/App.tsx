import { Layout, Menu } from "antd";

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sider>
        <div style={{ color: "white", padding: 20, fontSize: 18 }}>
          Football
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={[
            { key: "1", label: "Trang chủ" },
            { key: "2", label: "Danh sách sân" },
            { key: "3", label: "Đặt sân" },
            { key: "4", label: "Quản trị" },
          ]}
        />
      </Sider>

      {/* Main */}
      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 20 }}>
          Football Booking System
        </Header>

        <Content style={{ margin: 20 }}>
          Nội dung sẽ hiển thị ở đây
        </Content>
      </Layout>

    </Layout>
  );
}

export default App;