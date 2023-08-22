import { useState, useEffect } from "react";
import { Space, Calendar, Col, Row } from "antd";
import { Area, 
  // Column 
} from "@ant-design/plots";
import { Icon } from "@iconify/react";
import axios from "axios";
import "./DashboardStyle.css";

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
    axios.get('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  // const asyncFetch = () => {
  //   const request1 = axios.get(
  //     "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
  //   );
  //   const request2 = axios.get(
  //     "https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json"
  //   );

  //   Promise.all([request1, request2])
  //     .then(([response1, response2]) => {
  //       const data1 = response1.data;
  //       const data2 = response2.data;
  //       setData({
  //         data1: data1,
  //         data2: data2,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("fetch data failed", error);
  //     });
  // };
  
  // const data1 = [
  //   {
  //     name: "London",
  //     月份: "Jan.",
  //     月均降雨量: 18.9,
  //   },
  //   {
  //     name: "London",
  //     月份: "Feb.",
  //     月均降雨量: 28.8,
  //   },
  //   {
  //     name: "London",
  //     月份: "Mar.",
  //     月均降雨量: 39.3,
  //   },
  //   {
  //     name: "London",
  //     月份: "Apr.",
  //     月均降雨量: 81.4,
  //   },
  //   {
  //     name: "London",
  //     月份: "May",
  //     月均降雨量: 47,
  //   },
  //   {
  //     name: "London",
  //     月份: "Jun.",
  //     月均降雨量: 20.3,
  //   },
  //   {
  //     name: "London",
  //     月份: "Jul.",
  //     月均降雨量: 24,
  //   },
  //   {
  //     name: "London",
  //     月份: "Aug.",
  //     月均降雨量: 35.6,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Jan.",
  //     月均降雨量: 12.4,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Feb.",
  //     月均降雨量: 23.2,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Mar.",
  //     月均降雨量: 34.5,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Apr.",
  //     月均降雨量: 99.7,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "May",
  //     月均降雨量: 52.6,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Jun.",
  //     月均降雨量: 35.5,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Jul.",
  //     月均降雨量: 37.4,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Aug.",
  //     月均降雨量: 42.4,
  //   },
  // ];
  // const config1 = {
  //   data1,
  //   isGroup: true,
  //   xField: "月份",
  //   yField: "月均降雨量",
  //   seriesField: "name",
  //   label: {
  //     position: "middle",

  //     layout: [
  //       {
  //         type: "interval-adjust-position",
  //       },
  //       {
  //         type: "interval-hide-overlap",
  //       },
  //       {
  //         type: "adjust-color",
  //       },
  //     ],
  //   },
  // };
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
          <Col xs={48} sm={24} md={12}>
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
        </Row>
      </div>
      <div>
        <Row gutter={20}>
          <Col xs={48} sm={24} md={12}>
            <h1>Users</h1>
            <Area {...config} />
          </Col>
          <Col xs={48} sm={24} md={12}>
            <h1>Comments</h1>
            <Area {...config} />
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
