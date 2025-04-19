import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Spinner, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { GET_ALL_MAIN_CATEGORIES } from '../../../Api/api';

const CategoriesPreviewSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(GET_ALL_MAIN_CATEGORIES);
        setCategories(res.data.data.slice(0, 4)); 
      } catch (err) {
        console.error('فشل في تحميل التصنيفات');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '4rem 0' }}>
      <Container>
        <h2 className="text-center mb-5" style={{ color: '#000' }}>استكشف التصنيفات</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <Row className="g-4 justify-content-center">
            {categories.map((cat) => (
              <Col key={cat.id} xs={12} sm={6} md={3}>
                <Card className="h-100 text-center shadow-sm bg-white">
                  <Card.Img variant="top" src={cat.image} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{cat.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="text-center mt-4">
          <Button variant="success" onClick={() => navigate('/categories')}>
            عرض كل التصنيفات
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CategoriesPreviewSection;
