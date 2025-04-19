import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { GET_PRODUCT } from '../../Api/api';

const productDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const response = await axios.get(
          `${GET_PRODUCT}${id}`
        );
        setProduct(response.data.data);
      } catch (err) {
        setError('فشل في تحميل بيانات المنتج');
      } finally {
        setLoading(false);
      }
    };

    fetchproduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="dark" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!product) return null;

  return (
    <Container className="py-5 text-white" style={{ backgroundColor: '#111' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="bg-dark text-white shadow">
            <Card.Img variant="top" src={product.image} style={{ height: '350px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title className="fs-2 mb-3">{product.name}</Card.Title>
              <Card.Text className="mb-3">{product.description}</Card.Text>
              <h4>السعر: {product.price} ل.س</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default productDetailsPage;
