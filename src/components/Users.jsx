import { useEffect, useState } from "react";
import { Table, Space, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

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
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Delete">
            <a onClick={() => handleDeleteUser(record.id)}>
              <MdDeleteForever style={deleteButtonStyle} />
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const deleteButtonStyle = {
    width: "20px",
    height: "20px",
  };
  const tableContainerStyle = {
    width: "100%",
  };

  return (
    <Space direction="vertical" style={tableContainerStyle}>
      <h1>User Management</h1>
      <Table
        // pagination={false}
        // pagination={{ showQuickJumper: true, total: 100 }}
        columns={columns}
        dataSource={users}
        rowKey="id"
      />
    </Space>
  );
}

export default Users;
