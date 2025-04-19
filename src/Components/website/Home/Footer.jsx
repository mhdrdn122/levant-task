import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-success text-white py-4 mt-5">
      <Container className="text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Levant Task - جميع الحقوق محفوظة</p>
      </Container>
    </footer>
  );
};

export default Footer;
