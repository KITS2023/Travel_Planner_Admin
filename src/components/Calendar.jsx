import { useState, useEffect } from "react";
import { Space, Calendar } from "antd";
import "./CalendarStyle.css";

function Calendars() {
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

  return (
    <Space direction="vertical" className="calendar-container">
      <h1>Calendar</h1>
      <Calendar className="calendar" fullscreen={isMobile ? false : true} />
    </Space>
  );
}
export default Calendars;
