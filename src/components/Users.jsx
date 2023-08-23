import { useEffect, useState } from "react";
import { Table, Space, Tooltip, Input, Button } from "antd";
import { MdDeleteForever, MdUpdate } from "react-icons/md";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserFields, setUpdatedUserFields] = useState({});

  const handleInputChange = (event, userId) => {
    const { name, value } = event.target;
    setUpdatedUserFields((prevUpdatedUserFields) => ({
      ...prevUpdatedUserFields,
      [userId]: {
        ...prevUpdatedUserFields[userId],
        [name]: value,
      },
    }));
  };

  const handleUpdateUser = (userId) => {
    axios
      .put(
        `http://localhost:8080/api/users/${userId}`,
        updatedUserFields[userId],
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("User updated successfully", response);
        setEditingUserId(null);
        setUpdatedUserFields({});
      })
      .catch((error) => {
        console.log("Failed to update user", error);
      });
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("User deleted successfully", response);
      })
      .catch((error) => {
        console.log("Failed to delete user", error);
      });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullname",
      render: (text, record) =>
        editingUserId === record.id ? (
          <Input
            name="fullName"
            value={updatedUserFields[record.id]?.fullName || text}
            onChange={(event) => handleInputChange(event, record.id)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) =>
        editingUserId === record.id ? (
          <Input
            name="username"
            value={updatedUserFields[record.id]?.username || text}
            onChange={(event) => handleInputChange(event, record.id)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) =>
        editingUserId === record.id ? (
          <Input
            name="email"
            value={updatedUserFields[record.id]?.email || text}
            onChange={(event) => handleInputChange(event, record.id)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        editingUserId === record.id ? (
          <>
            <Button type="primary" onClick={() => handleUpdateUser(record.id)}>
              Save
            </Button>{" "}
            <Button onClick={() => setEditingUserId(null)}>Cancel</Button>
          </>
        ) : (
          <Space size="middle">
            <Tooltip title="Update">
              <a onClick={() => setEditingUserId(record.id)}>
                <MdUpdate />
              </a>
            </Tooltip>
            <Tooltip title="Delete">
              <a onClick={() => handleDeleteUser(record.id)}>
                <MdDeleteForever />
              </a>
            </Tooltip>
          </Space>
        ),
    },
  ];
  const tableContainerStyle = {
    width: "50%",
  };

  return (
    <Space direction="vertical" style={tableContainerStyle}>
      <h1>User Management</h1>
      <Table
        pagination={false}
        columns={columns}
        dataSource={users}
        rowKey="id"
      />
    </Space>
  );
}

export default Users;
