import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; 
import { LOGIN } from "../../Api/api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);

  const cookies = Cookie();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userName.trim() || !password.trim()) {
      toast.error('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }
    
    if (userName.trim().length < 2) {
      toast.error('اسم المستخدم يجب أن يحتوي على حرفين على الأقل');
      return;
    }
    
    if (password.trim().length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    

    const formData = new FormData();
    formData.append("user_name", userName);
    formData.append("password", password);
    setLoading(true);
    try {
      const response = await axios.post(`${LOGIN}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setToken(response.data.data.token);
      cookies.set("token" , response.data.data.token)
      toast.success("Login Successful");
      navigate("/admin/dashboard/show-ads");
    } catch (error) {
      setLoading(false);
      toast.error("Login Failed" + error);
    }
    setLoading(false);
  };


  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row
        className="justify-content-center"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Col md={12}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {loading ? (
              <Button 
              variant="success"
              className="w-100" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            ) : (
              <Button
                variant="success"
                type="submit"
                className="w-100"
              > login </Button>
            )}
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default LoginPage;
