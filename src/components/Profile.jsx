import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    login();
  }, []);

  return (
    <div>
      <h2>Welcome, {user.fullName}!</h2>
      <p>Avatar: {user.profilePicture}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Preferences: {user.preferences}</p>
    </div>
  );
};

export default ProfilePage;
