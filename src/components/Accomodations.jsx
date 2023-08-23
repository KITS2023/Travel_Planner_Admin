import { useEffect, useState } from "react";
import { Space, Table } from "antd";
import axios from "axios";

function Accomodations() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/accommodations",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHotels(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchHotels();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
  ];

  const tableContainerStyle = {
    width: "100%",
  };

  return (
    <Space direction="vertical" style={tableContainerStyle}>
      <h1>Accomodations</h1>
      <Table
        pagination={false}
        columns={columns}
        dataSource={hotels}
        rowKey="id"
      />
    </Space>
  );
}

export default Accomodations;
