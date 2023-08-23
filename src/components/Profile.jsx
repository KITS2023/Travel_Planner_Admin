import { useState, useEffect } from "react";
import { Card, Space } from "antd";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let userObj = localStorage.getItem("currentUser");
    setUser(JSON.parse(userObj));
  }, []);

  console.log(user);

  const cardStyle = {
    width: "50%",
  };
  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  };
  return (
    <>
      {user && (
        <div style={cardContainerStyle}>
          <Card title="User Profile" style={cardStyle}>
            <Space direction="vertical">
              <h2>{user.fullName}</h2>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </Space>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
