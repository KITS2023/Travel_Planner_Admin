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
} from "antd";
import {
  CopyrightOutlined,
  SearchOutlined,
  UserOutlined,
  MenuOutlined,
  AppstoreOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Flights from "./components/Flights";
import Activities from "./components/Activities";
import Accomodations from "./components/Accomodations";
import Users from "./components/Users";
import Comments from "./components/Comments";
import Calendars from "./components/Calendar";
import "./App.css";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

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

  return (
    <Layout className="app-layout">
      <Sider
        className="sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={70}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <Header className="sider-header">
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
          defaultOpenKeys={["sub1", "sub2"]}
          mode="inline"
        ></Menu>
      </Sider>
      <Layout>
        <Header className="content-header">
          <Space>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="collapse-button"
            />
            <Divider type="vertical"></Divider>
          </Space>
          <Input
            size="default"
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="search-input"
          />
          <Space>
            <Divider type="vertical"></Divider>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Avatar className="avatar" icon={<UserOutlined />} />
              </a>
            </Dropdown>
          </Space>
        </Header>
        <Content className="content">
          <Routes>
            <Route path="/" element={<Calendars />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/accomodations" element={<Accomodations />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/users" element={<Users />} />
            <Route path="/comments" element={<Comments />} />
          </Routes>
        </Content>
        <Footer className="footer">
          Travel Planner <CopyrightOutlined /> 2023 Group C6
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
