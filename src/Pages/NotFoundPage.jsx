import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e9fbe5', display: 'flex', alignItems: 'center' }}>
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h1 className="display-1 fw-bold text-success">404</h1>
            <h2 className="mb-4 text-dark">الصفحة غير موجودة</h2>
            <p className="mb-4 text-muted">
              عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.
            </p>
            <Button variant="success" size="lg" onClick={() => navigate('/')}>العودة إلى الرئيسية</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;