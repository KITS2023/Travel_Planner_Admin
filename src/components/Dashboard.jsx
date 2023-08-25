import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Space, Calendar, Col, Row, Card } from "antd";
// import { Area, Column } from "@ant-design/plots";
import { Icon } from "@iconify/react";
import axios from "axios";
import "../style/DashboardStyle.css";

// const ColumnChart = () => {
//   const data = [
//     {
//       name: "Positive",
//       month: "Jan.",
//       amount: 18.9,
//     },
//     {
//       name: "Positive",
//       month: "Feb.",
//       amount: 28.8,
//     },
//     {
//       name: "Positive",
//       month: "Mar.",
//       amount: 39.3,
//     },
//     {
//       name: "Positive",
//       month: "Apr.",
//       amount: 81.4,
//     },
//     {
//       name: "Positive",
//       month: "May",
//       amount: 47,
//     },
//     {
//       name: "Positive",
//       month: "Jun.",
//       amount: 20.3,
//     },
//     {
//       name: "Positive",
//       month: "Jul.",
//       amount: 24,
//     },
//     {
//       name: "Positive",
//       month: "Aug.",
//       amount: 35.6,
//     },
//     {
//       name: "Negative",
//       month: "Jan.",
//       amount: 12.4,
//     },
//     {
//       name: "Negative",
//       month: "Feb.",
//       amount: 23.2,
//     },
//     {
//       name: "Negative",
//       month: "Mar.",
//       amount: 34.5,
//     },
//     {
//       name: "Negative",
//       month: "Apr.",
//       amount: 99.7,
//     },
//     {
//       name: "Negative",
//       month: "May",
//       amount: 52.6,
//     },
//     {
//       name: "Negative",
//       month: "Jun.",
//       amount: 35.5,
//     },
//     {
//       name: "Negative",
//       month: "Jul.",
//       amount: 37.4,
//     },
//     {
//       name: "Negative",
//       month: "Aug.",
//       amount: 42.4,
//     },
//   ];
//   const config = {
//     data,
//     isGroup: true,
//     xField: "month",
//     yField: "amount",
//     seriesField: "name",
//     color: ["#26a65b", "#ef4836"],
//     label: {
//       position: "middle",
//       layout: [
//         {
//           type: "interval-adjust-position",
//         },
//         {
//           type: "interval-hide-overlap",
//         },
//         {
//           type: "adjust-color",
//         },
//       ],
//     },
//   };
//   return config;
// };

function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);
  // const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const [accommodationCount, setAccommodationCount] = useState(0);
  const [activityCount, setActivityCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, flightResponse, accommodationResponse, activityResponse, destinationResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/users", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://localhost:8080/api/flights", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://localhost:8080/api/accommodations", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://localhost:8080/api/activities", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://localhost:8080/api/destinations", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        ]);

        setUserCount(userResponse.data.data.length);
        setFlightCount(flightResponse.data.data.length);
        setAccommodationCount(accommodationResponse.data.data.length);
        setActivityCount(activityResponse.data.data.length);
        setDestinationCount(destinationResponse.data.data.length);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleWindowResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    fetchData();
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  // const asyncFetch = () => {
  //   axios
  //     .get(
  //       "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
  //     )
  //     .then((response1) => {
  //       setData(response1.data);
  //     })
  //     .catch((error) => {
  //       console.log("fetch data failed", error);
  //     });
  // };

  // const config1 = ColumnChart();
  // const config = {
  //   data,
  //   xField: "Date",
  //   yField: "scales",
  //   xAxis: {
  //     range: [0, 1],
  //     tickCount: 5,
  //   },
  //   areaStyle: () => {
  //     return {
  //       fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
  //     };
  //   },
  // };

  return (
    <Space direction="vertical" className="dashboard-container">
      <div>
        <h1>Statistics</h1>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={16} lg={12} xl={8}>
            <Link to="/users">
              <Card hoverable className="gutter-row">
                <Icon icon="fa-solid:users" color="gray" />
                <h4>Users</h4>
                <h2>{userCount}</h2>
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link to="/flights">
              <Card hoverable className="gutter-row">
                <Icon icon="material-symbols:flight" color="gray" />
                <h4>Flights</h4>
                <h2>{flightCount}</h2>
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link to="/accommodations">
              <Card hoverable className="gutter-row">
                <Icon icon="material-symbols:hotel-sharp" color="gray" />
                <h4>Accommodations</h4>
                <h2>{accommodationCount}</h2>
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link to="/activities">
              <Card hoverable className="gutter-row">
                <Icon icon="tabler:activity" color="gray" />
                <h4>Activities</h4>
                <h2>{activityCount}</h2>
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link to="/destinations">
              <Card hoverable className="gutter-row">
                <Icon icon="majesticons:map-simple-destination" color="gray" />
                <h4>Destinations</h4>
                <h2>{destinationCount}</h2>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
      {/* <div>
        <Row gutter={20}>
          <Col xs={48} sm={24} md={12}>
            <h1>Users</h1>
            <Area {...config} className="chart" />
          </Col>
          <Col xs={48} sm={24} md={12}>
            <h1>Comments</h1>
            <Column {...config1} className="chart" />
          </Col>
        </Row>
      </div> */}
      <div className="calendar-container">
        <h1>Calendar</h1>
        <Calendar className="calendar" fullscreen={isMobile ? false : true} />
      </div>
    </Space>
  );
}
export default Dashboard;
