import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const AdsGrid = ({ ads, onClick }) => {
  return (
    <Row className="g-4 mb-5"> 
      {ads.map((ad) => (
        <Col key={ad.id} xs={12} sm={6} md={4} lg={3}>
          <Card
            onClick={() => onClick(ad.id)}
            className="h-100 bg-light text-black shadow-sm"
            style={{ cursor: 'pointer' }}
          >
            <Card.Img
              variant="top"
              src={ad.image}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="text-center">
              <Card.Title>{ad.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AdsGrid;
