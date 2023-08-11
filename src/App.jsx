// App.jsx
import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <h1>Hello World!</h1>
            This is admin homepage.
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;