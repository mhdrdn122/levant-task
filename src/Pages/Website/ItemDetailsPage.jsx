// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { GET_PRODUCTS } from '../../Api/api';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${GET_PRODUCTS}${id}`);
        setProducts(response.data.data);
      } catch (err) {
        setError('فشل في تحميل بيانات المنتج');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  if (!products || products.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">لا يوجد منتجات لعرضها</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center text-dark mb-5">المنتجات المتوفرة</h2>
      <Row className="g-4">
        {products.map((prod) => (
          <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="bg-dark text-white shadow h-100">
              <Card.Img
                variant="top"
                src={prod.image}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title className="fs-5 mb-2">{prod.name}</Card.Title>
                <Card.Text className="mb-2">{prod.description}</Card.Text>
                <h5>السعر: {prod.price} ل.س</h5>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
