import { useState, useEffect } from "react";
import { Space } from "antd";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfileUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/1", 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getProfileUser();
  }, []);

  console.log(user);

  return (
    <>
      {user && (
        <Space direction="vertical">
          <h2>Welcome, {user.fullName}!</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </Space>
      )}
    </>
  );
};

export default ProfilePage;
