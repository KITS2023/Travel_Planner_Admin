import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Image,
  Space,
  Avatar,
  Dropdown,
  Input,
  Divider,
  Calendar,
} from "antd";
import {
  CopyrightOutlined,
  SearchOutlined,
  UserOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const menuItems = [
    // icons are to be changed later when determining child components
    {
      label: <Link to="">Users</Link>,
      key: "",
      icon: <Icon icon="mdi:human-hello" width="20" height="20" />,
    },
    {
      label: <Link to="">Comments</Link>,
      key: "",
      icon: <Icon icon="ri:currency-fill" width="20" height="20" />,
    },
  ];
  const items = [
    {
      label: <a href="">Profile</a>,
      key: "0",
    },
    {
      label: <a href="">Settings</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <a href="">Logout</a>,
      key: "3",
    },
  ];

  const layoutStyle = {
    minHeight: "100vh",
  };
  const siderHeaderStyle = {
    padding: "20px",
    alignItems: "center",
    margin: "auto",
    display: "flex",
    lineHeight: 0,
    background: "white",
  };
  const contentHeaderStyle = {
    color: "black",
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    alignItems: "center",
    background: "white",
    display: "flex",
    lineHeight: 0,
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };
  const contentStyle = { margin: "16px 16px 0", padding: 16 };
  const siderStyle = {
    background: "white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };
  const footerStyle = {
    background: "white",
    textAlign: "center",
    color: "gray",
  };
  const avatarStyle = { backgroundColor: "#87d068" };
  const searchInputStyle = { maxWidth: "200px" };
  const collapseButtonStyle = { fontSize: "16px", width: 64, height: 64 };
  return (
    <Layout style={layoutStyle}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={siderStyle}
      >
        <Header style={siderHeaderStyle}>
          <Space>
            {collapsed ? (
              <Image src="public\logo-collapsed.png" preview={false} />
            ) : (
              <Image width={100} src="public\logo.png" preview={false} />
            )}
          </Space>
        </Header>
        <Divider orientation="left">MANAGEMENT</Divider>
        <Menu items={menuItems} theme="light"></Menu>
        <Divider orientation="left">Chart</Divider>
      </Sider>
      <Layout>
        <Header style={contentHeaderStyle}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={collapseButtonStyle}
          />
          <h2>DASHBOARD</h2>
          <Input
            size="default"
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={searchInputStyle}
          />
          <Space>
            
            <Divider type="vertical"></Divider>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <DownOutlined />
                  Admin
                </Space>
              </a>
            </Dropdown>
            <Avatar style={avatarStyle} icon={<UserOutlined />} />
          </Space>
        </Header>
        <Content style={contentStyle}>
          <h1>Calendar</h1>
          <Calendar onPanelChange={onPanelChange} />
        </Content>
        <Footer style={footerStyle}>
          Travel Planner <CopyrightOutlined /> 2023 Group C6
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
