import { useState, useEffect } from "react";
import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
  Popover,
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
import Accommodations from "./components/Accommodations";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/Profile";
import Destinations from "./components/Destinations";
import "./style/App.css";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     navigate("/login");
  //   }
  // });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
    getItem(
      <Link to="/">Dashboard</Link>,
      "sub0",
      <Icon icon="carbon:dashboard" />
    ),
    getItem("Businesses", "sub1", <PieChartOutlined />, [
      getItem(<Link to="/flights">Flights</Link>, "1"),
      getItem(<Link to="/accommodations">Accommodations</Link>, "2"),
      getItem(<Link to="/activities">Activities</Link>, "3"),
      getItem(<Link to="/destinations">Destinations</Link>, "4"),
    ]),
    getItem("Management", "sub2", <AppstoreOutlined />, [
      getItem(<Link to="/users">Users</Link>, "5"),
    ]),
  ];

  const items = [
    {
      label: <Link to="/profile">Profile</Link>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: "3",
    },
  ];
  const content = (
    <div>
      <p>Notification 1</p>
      <p>Notification 2</p>
    </div>
  );
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
            <Link to="/">
              {collapsed ? (
                <Image src="\logo-collapsed.png" preview={false} />
              ) : (
                <Image width={100} src="\logo.png" preview={false} />
              )}
            </Link>
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
            <Popover content={content} title="Notification" trigger="click">
              <Badge count={10} overflowCount={9}>
                <Button
                  shape="circle"
                  icon={<Icon icon="mi:notification" width={20} height={20} />}
                ></Button>
              </Badge>
            </Popover>
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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/users" element={<Users />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Content>
        <Footer className="footer">
          Travel Planner <CopyrightOutlined /> 2023 Group C6
        </Footer>
        <FloatButton.BackTop visibilityHeight={0} />
      </Layout>
    </Layout>
  );
}

export default App;
