import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
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
  AppstoreOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Flights from "./components/Flights";
import Activities from "./components/Activities";
import Accomodations from "./components/Accomodations";
import Users from "./components/Users";
import Comments from "./components/Comments";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const menuItems = [
    getItem("Dashboard", "sub1", <PieChartOutlined />, [
      getItem(<Link to="/flights">Flights</Link>, "1"),
      getItem(<Link to="/accomodations">Accomodations</Link>, "2"),
      getItem(<Link to="/activities">Activities</Link>, "3"),
    ]),
    getItem("Management", "sub2", <AppstoreOutlined />, [
      getItem(<Link to="/users">Users</Link>, "4"),
      getItem(<Link to="/comments">Comments</Link>, "5"),
    ]),
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
  const contentStyle = { margin: 16, padding: 16 };
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
        <Menu
          items={menuItems}
          theme="light"
          // defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
          mode="inline"
          // inlineCollapsed={collapsed}
        ></Menu>
      </Sider>
      <Layout>
        <Header style={contentHeaderStyle}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={collapseButtonStyle}
          />

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
          <Routes>
            <Route path="/flights" element={<Flights />} />
            <Route path="/accomodations" element={<Accomodations />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/users" element={<Users />} />
            <Route path="/comments" element={<Comments />} />
          </Routes>
        </Content>
        <Footer style={footerStyle}>
          Travel Planner <CopyrightOutlined /> 2023 Group C6
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
