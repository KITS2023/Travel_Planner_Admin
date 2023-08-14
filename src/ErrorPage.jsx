import { useRouteError, useNavigate } from "react-router-dom";
import { Button, Space } from "antd";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate("/");
  };
  const pageStyle = {
    margin: "0 auto",
    width: "300px",
    height: "100%",
    display: "flex",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const imageStyle = {
    width: "300px",
    height: "300px",
  };
  return (
    <Space style={pageStyle}>
      <img src="public\notfound404.jpg" style={imageStyle} />
      <h1>Oops!</h1>
      <p>
        Sorry, the page you are looking for might have been removed or
        temporarily unavailable.
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button type="primary" onClick={goToHomepage}>
        Go to Homepage
      </Button>
    </Space>
  );
};

export default ErrorPage;
