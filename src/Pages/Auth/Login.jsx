import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import Axios
import { LOGIN } from '../../Api/api';
import Cookie  from 'cookie-universal'

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const cookies = Cookie() 


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('user_name', userName);
    formData.append('password', password);
    setLoading(true)
    try {
      const response = await axios.post(`${LOGIN}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  console.log("response " , response)

    //   setToken(response.data.data.token)
      cookies.set('toket', response.data.data.token )
      toast.success('Login Successful');
    } catch (error) {
    setLoading(false)
      toast.error('Login Failed' + error);
    }
    setLoading(false)

  };

//   console.log("token " , token)

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center" style={{ width: '100%', maxWidth: '400px' }}>
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

            <Button variant="primary" type="submit" className="w-100">
              {loading ? "loading..." : "Login" }
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default LoginPage;