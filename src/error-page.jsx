import { useRouteError, useNavigate } from "react-router-dom";
import { Button, Space } from "antd";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    const navigate = useNavigate();

    const goToHomepage = () => {
        navigate('/');
    };
    return (
        <Space id="error-page" style={{
            margin: "0 auto", width: "300px", height: "100%", display: "flex", padding: "20px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
            <img src="public\8030430_3828537.jpg" style={{ width: "300px", height: "300px" }} />
            <h1>Oops!</h1>
            <p>Sorry, the page you are looking for might have been removed or temporarily unavailable.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Button type="primary" onClick={goToHomepage}>Go to Homepage</Button>
        </Space>
    );
}