// App.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
// import { Icon } from "@iconify/react";
const { Header, Content, Footer, Sider } = Layout;

function App() {
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Header style={{ color: "white" }}>Travel Planner</Header>
        <Menu items={menuItems} theme="dark"></Menu>
      </Sider>
      <Layout>
        <Header style={{ color: "white" }}>Admin/Dashboard</Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <h1>Hello World!</h1>
            This is admin homepage.
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}

export default App;
