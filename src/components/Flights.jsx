import { useEffect, useState } from "react";
import { Space, Table } from "antd";
import axios from "axios";

function Flights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/flights", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFlights(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFlights();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Trip",
      dataIndex: "trip",
      key: "trip",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Departure",
      dataIndex: "departure",
      key: "departure",
    },
    {
      title: "Arrival",
      dataIndex: "arrival",
      key: "arrival",
    },
    {
      title: "Transit",
      dataIndex: "transit",
      key: "transit",
    },
    {
      title: "Airline",
      dataIndex: "airline",
      key: "airline",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    }
  ];
  const tableContainerStyle = {
    width: "100%",
  };

  return (
    <Space direction="vertical" style={tableContainerStyle}>
      <h1>Flights</h1>
      <Table
        pagination={false}
        columns={columns}
        dataSource={flights}
        rowKey="id"
      />
    </Space>
  );
}
export default Flights;
