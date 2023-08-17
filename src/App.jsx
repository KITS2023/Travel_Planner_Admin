import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
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
  FloatButton,
  Badge,
} from "antd";
import {
  CopyrightOutlined,
  SearchOutlined,
  UserOutlined,
  MenuOutlined,
  AppstoreOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import Flights from "./components/Flights";
import Activities from "./components/Activities";
import Accomodations from "./components/Accomodations";
import Users from "./components/Users";
import Comments from "./components/Comments";
import Dashboard from "./components/Dashboard";
import LoginForm from "./Login";
import "./App.css";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [token, setToken] = useState(null);

  const pathname = window.location.pathname;
  const navigate = useNavigate();
  if ((!token || !token.length) && pathname !== "/login") {
    navigate.push("/login");
  }

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
    getItem(
      <Link to="/">Dashboard</Link>,
      "sub0",
      <Icon icon="carbon:dashboard" />
    ),
    getItem("Charts", "sub1", <PieChartOutlined />, [
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
  const handleSubmit = async (username, password) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const { token } = await response.json();
    setToken(token);
  };
  return (
    <>
      {token ? (
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
            {collapsed ? (
              <></>
            ) : (
              <div className="avatar-sider-container">
                <Avatar
                  size={50}
                  className="avatar-sider"
                  icon={<UserOutlined />}
                ></Avatar>
                <h3>Admin</h3>
              </div>
            )}

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
                <Badge count={10} overflowCount={9}>
                  <Button
                    shape="circle"
                    icon={
                      <Icon icon="mi:notification" width={20} height={20} />
                    }
                  ></Button>
                </Badge>
                <Divider type="vertical"></Divider>
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar className="avatar-header" icon={<UserOutlined />} />
                  </a>
                </Dropdown>
              </Space>
            </Header>
            <Content className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
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
            <FloatButton.BackTop visibilityHeight={0} />
          </Layout>
        </Layout>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<LoginForm onSubmit={handleSubmit} />}
          ></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
