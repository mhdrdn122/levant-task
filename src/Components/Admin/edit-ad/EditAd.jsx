import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useEditAd } from './useEditAd';
import EditAdForm from './EditAdForm';

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ad, loading, error } = useEditAd(id);

  const handleSuccess = () => {
    setTimeout(() => {
      navigate('/admin/dashboard/show-ads');
    }, 1000);
  };

  return (
    <Container className="py-5" style={{ backgroundColor: '#fff', color: '#000' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="mb-4 text-center">تعديل الإعلان</h3>
          {loading && (
            <div className="text-center">
              <Spinner animation="border" variant="success" />
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          {ad && <EditAdForm ad={ad} id={id} onSuccess={handleSuccess} />}
        </Col>
      </Row>
    </Container>
  );
};

export default EditAd;
