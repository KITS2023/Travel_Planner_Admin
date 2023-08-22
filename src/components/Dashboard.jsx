import { useState, useEffect } from "react";
import { Space, Calendar, Col, Row, Card } from "antd";
import { Area, Column } from "@ant-design/plots";
import { Icon } from "@iconify/react";
import axios from "axios";
import "./DashboardStyle.css";

const DemoColumn = () => {
  const data = [
    {
      name: "Positive",
      month: "Jan.",
      amount: 18.9,
    },
    {
      name: "Positive",
      month: "Feb.",
      amount: 28.8,
    },
    {
      name: "Positive",
      month: "Mar.",
      amount: 39.3,
    },
    {
      name: "Positive",
      month: "Apr.",
      amount: 81.4,
    },
    {
      name: "Positive",
      month: "May",
      amount: 47,
    },
    {
      name: "Positive",
      month: "Jun.",
      amount: 20.3,
    },
    {
      name: "Positive",
      month: "Jul.",
      amount: 24,
    },
    {
      name: "Positive",
      month: "Aug.",
      amount: 35.6,
    },
    {
      name: "Negative",
      month: "Jan.",
      amount: 12.4,
    },
    {
      name: "Negative",
      month: "Feb.",
      amount: 23.2,
    },
    {
      name: "Negative",
      month: "Mar.",
      amount: 34.5,
    },
    {
      name: "Negative",
      month: "Apr.",
      amount: 99.7,
    },
    {
      name: "Negative",
      month: "May",
      amount: 52.6,
    },
    {
      name: "Negative",
      month: "Jun.",
      amount: 35.5,
    },
    {
      name: "Negative",
      month: "Jul.",
      amount: 37.4,
    },
    {
      name: "Negative",
      month: "Aug.",
      amount: 42.4,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: "month",
    yField: "amount",
    seriesField: "name",
    color: ['#26a65b', '#ef4836'],
    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return config;
};

function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    axios
      .get(
        "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
      )
      .then((response1) => {
        setData(response1.data);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config1 = DemoColumn();
  const config = {
    data,
    xField: "Date",
    yField: "scales",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };

  return (
    <Space direction="vertical" className="dashboard-container">
      <div>
        <h1>Statistics</h1>
        <Row gutter={20}>
          <Col xs={48} sm={24} md={12}>
            <Card className="gutter-row">
              <Icon icon="fa-solid:users" color="gray" />
              <h4>Users</h4>
              <h2 className="up">2,000</h2>
              <p>
                <Icon
                  icon="teenyicons:up-solid"
                  color="#26a65b"
                  width={10}
                  height={10}
                />{" "}
                5% from last month
              </p>
            </Card>
          </Col>
          <Col xs={48} sm={24} md={12}>
            <Card className="gutter-row">
              <Icon icon="fa6-solid:comments" color="gray" />
              <h4>Comments</h4>
              <h2 className="down">20,000</h2>
              <p>
                <Icon
                  icon="teenyicons:down-solid"
                  color="#ef4836"
                  width="10"
                  height="10"
                />{" "}
                20% from last month
              </p>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={20}>
          <Col xs={48} sm={24} md={12}>
            <h1>Users</h1>
            <Area {...config} className="area-chart" />
          </Col>
          <Col xs={48} sm={24} md={12}>
            <h1>Comments</h1>
            <Column {...config1} className="column-chart" />
          </Col>
        </Row>
      </div>
      <div className="calendar-container">
        <h1>Calendar</h1>
        <Calendar className="calendar" fullscreen={isMobile ? false : true} />
      </div>
    </Space>
  );
}
export default Dashboard;
