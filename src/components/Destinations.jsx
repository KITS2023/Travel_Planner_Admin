import { useEffect, useState } from "react";
import { Space, Table } from "antd";
import axios from "axios";

function Destinations() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/destinations", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPlaces(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPlaces();
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Image Url",
      dataIndex: "imageUrl",
      key: "imageUrl",
    },
  ];
  const tableContainerStyle = {
    width: "100%",
  };

  return (
    <Space direction="vertical" style={tableContainerStyle}>
      <h1>Destinations</h1>
      <Table
        pagination={false}
        columns={columns}
        dataSource={places}
        rowKey="id"
      />
    </Space>
  );
}
export default Destinations;
