import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CreateAdForm from './CreateAdForm';

const CreateAd = () => {
  return (
    <Container className="py-5" style={{ backgroundColor: '#fff', color: '#000' }}>
      <h3 className="mb-4 text-center">إضافة إعلان جديد</h3>
      <CreateAdForm />
    </Container>
  );
};

export default CreateAd;
