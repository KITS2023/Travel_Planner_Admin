import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Image, Space } from "antd";
import { CopyrightOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = [
    {
      label: <Link to="/item1">Item 1</Link>,
      key: "/item1",
      // icon: <Icon icon="mdi:human-hello" width="20" height="20" />,
    },
    {
      label: <Link to="/item2">Item 2</Link>,
      key: "/item2",
      // icon: <Icon icon="ri:currency-fill" width="20" height="20" />,
    },
    {
      label: <Link to="/item 3">Item 3</Link>,
      key: "/item 3",
      // icon: <Icon icon="mdi:calculator" width="20" height="20" />,
    },
  ];

  const layoutStyle = {
    minHeight: "100vh",
  };
  const siderHeaderStyle = {
    padding: "20px",
    color: "white",
    alignItems: "center",
    margin: "auto",
    display: "flex",
    lineHeight: 0,
  };
  const contentHeaderStyle = {
    color: "white",
    padding: 0,
    alignItems: "center",
    display: "flex",
    lineHeight: 0,
  };
  const collapsedButton = { color: "white", marginLeft: 10, marginRight: 20 };
  const contentStyle = { margin: "24px 16px 0", padding: 24 };

  return (
    <Layout style={layoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Header style={siderHeaderStyle}>
          <Space>
            {collapsed ? (
              <Image src="public\logo-collapsed.png" />
            ) : (
              <Image width={100} src="public\logo.png" />
            )}
          </Space>
        </Header>
        <Menu items={menuItems} theme="dark"></Menu>
      </Sider>
      <Layout>
        <Header style={contentHeaderStyle}>
          <Space>
            <Button
              type="text"
              style={collapsedButton}
              icon={
                collapsed ? (
                  <Icon
                    icon="line-md:menu-unfold-right"
                    width="20"
                    height="20"
                  />
                ) : (
                  <Icon icon="line-md:menu-fold-right" width="20" height="20" />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
            />
            <h3>Dashboard</h3>
          </Space>
        </Header>
        <Content style={contentStyle}>
          <h1>Hello World!</h1>
          This is admin homepage.
        </Content>
        <Footer>
          Travel Planner <CopyrightOutlined /> 2023 Created by Group C6
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
