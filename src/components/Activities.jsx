import { useEffect, useState } from "react";
import { Space, Table } from "antd";
import axios from "axios";

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/activities",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setActivities(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchActivities();
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Trip",
      dataIndex: "trip",
      key: "trip",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
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
      <h1>Activities</h1>
      <Table
        pagination={false}
        columns={columns}
        dataSource={activities}
        rowKey="id"
      />
    </Space>
  );
}
export default Activities;
