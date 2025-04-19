import React, { useState } from 'react';
import { Row, Col, Card, Collapse, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { GET_ALL_SUB_CATEGORIES, GET_PRODUCTS } from '../../../Api/api';

const CategoriesGrid = ({ categories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingSub, setLoadingSub] = useState(false);
  const [loadingproducts, setLoadingproducts] = useState(false);
  
  const handleCategoryClick = async (id) => {
    if (selectedCategoryId === id) {
      setSelectedCategoryId(null);
      setSubcategories([]); 
      setProducts([]);
      return;
    }
    setSelectedCategoryId(id);
    setSubcategories([]);
    setProducts([]);
    setLoadingSub(true);
    try {
      const res = await axios.get(`${GET_ALL_SUB_CATEGORIES}${id}`);
      setSubcategories(res.data.data);
    } catch (err) {
      console.error('فشل في تحميل التصنيفات الفرعية');
    } finally {
      setLoadingSub(false);
    }
  };

  const handleSubcategoryClick = async (subId) => {
    if (selectedSubcategoryId === subId) {
      setSelectedSubcategoryId(null);
      setProducts([]);
      return;
    }
    setSelectedSubcategoryId(subId);
    setProducts([]);
    setLoadingproducts(true);
    try {
      const res = await axios.get(`${GET_PRODUCTS}${subId}`);
      setProducts(res.data.data);
    } catch (err) {
      console.error('فشل في تحميل المنتجات');
    } finally {
      setLoadingproducts(false);
    }
  };

  return (
    <Row className="g-4 mb-5">
      {categories.map((category) => (
        <Col key={category.id} xs={12} sm={6} md={4} lg={3}>
          <Card
            onClick={() => handleCategoryClick(category.id)}
            className="h-100 bg-light text-dark shadow-sm"
            style={{ cursor: 'pointer' }}
          >
            <Card.Img variant="top" src={category.image} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body className="text-center">
              <Card.Title>{category.name}</Card.Title>
            </Card.Body>
          </Card>

          <Collapse in={selectedCategoryId === category.id}>
            <div className="mt-3">
              {loadingSub ? (
                <div className="text-center">
                  <Spinner animation="border" variant="success" />
                </div>
              ) : (
                <Row className="g-3">
                  {subcategories.map((subcategory) => (
                    <Col key={subcategory.id} xs={12}>
                      <Card
                        onClick={() => handleSubcategoryClick(subcategory.id)}
                        className="bg-secondary text-white"
                        style={{ cursor: 'pointer' }}
                      >
                        <Card.Img variant="top" src={subcategory.image} style={{ height: '150px', objectFit: 'cover' }} />
                        <Card.Body className="text-center">
                          <Card.Title>{subcategory.name}</Card.Title>
                        </Card.Body>
                      </Card>

                      <Collapse in={selectedSubcategoryId === subcategory.id}>
                        <div className="mt-3">
                          {loadingproducts ? (
                            <div className="text-center">
                              <Spinner animation="border" variant="success" />
                            </div>
                          ) : (
                            <Row className="g-3">
                              {products.map((item) => (
                                <Col key={item.id} xs={12} md={6}>
                                  <Card className="bg-light text-dark h-100">
                                    <Card.Img variant="top" src={item.image} style={{ height: '180px', objectFit: 'cover' }} />
                                    <Card.Body>
                                      <Card.Title>{item.name}</Card.Title>
                                      <Card.Text>{item.description}</Card.Text>
                                      <div className="fw-bold">السعر: {item.price}</div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              ))}
                            </Row>
                          )}
                        </div>
                      </Collapse>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Collapse>
        </Col>
      ))}
    </Row>
  );
};

export default CategoriesGrid;
