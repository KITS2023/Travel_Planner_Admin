import { useState, useEffect } from "react";
import { Space, Calendar, Col, Row } from "antd";
import { Area } from "@ant-design/plots";
import { Icon } from "@iconify/react";
import axios from "axios";
import "./DashboardStyle.css";

function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

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
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    axios
      .get(
        "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

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
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <div className="gutter-row">
              <Space>
                <Icon icon="fa-solid:users" color="gray" />
                <h4>Users</h4>
              </Space>
              <h1 className="up">2,000</h1>
              <p>
                <Icon
                  icon="teenyicons:up-solid"
                  color="#26a65b"
                  width={10}
                  height={10}
                />{" "}
                5% from last month
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="gutter-row">
              <Space>
                <Icon icon="fa6-solid:comments" color="gray" />
                <h4>Comments</h4>
              </Space>
              <h1 className="down">20,000</h1>
              <p>
                <Icon
                  icon="teenyicons:down-solid"
                  color="#ef4836"
                  width="10"
                  height="10"
                />{" "}
                20% from last month
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="gutter-row">
              <Space>
                <Icon icon="humbleicons:activity" color="gray" />
                <h4>Activities</h4>
              </Space>
              <h1 className="up">500</h1>
              <p>
                <Icon
                  icon="teenyicons:up-solid"
                  color="#26a65b"
                  width={10}
                  height={10}
                />{" "}
                2% from last month
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="gutter-row">
              <Space>
                <Icon icon="bi:houses" color="gray" />
                <h4>Accomodations</h4>
              </Space>
              <h1 className="down">1,000</h1>
              <p>
                <Icon
                  icon="teenyicons:down-solid"
                  color="#ef4836"
                  width="10"
                  height="10"
                />{" "}
                10% from last month
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <h1>Statistics</h1>
        <Area {...config} />
      </div>
      <div className="calendar-container">
        <h1>Calendar</h1>
        <Calendar className="calendar" fullscreen={isMobile ? false : true} />
      </div>
    </Space>
  );
}
export default Dashboard;
