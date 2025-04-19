import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from 'axios';
import CategoriesGrid from '../../Components/website/Categories/CategoriesGrid';
import AdsGrid from '../../Components/website/Categories/AdsGrid';
import { GET_ADS, GET_ALL_MAIN_CATEGORIES } from '../../Api/api';

const MainCategories = () => {
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingAds, setLoadingAds] = useState(true);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${GET_ALL_MAIN_CATEGORIES}`);
        setCategories(res.data.data);
      } catch (err) {
        setError('فشل في تحميل التصنيفات');
      } finally {
        setLoading(false);
      }
    };

    const fetchAds = async () => {
      try {
        const res = await axios.get(`${GET_ADS}`);
        setAds(res.data.data);
      } catch (err) {
        setError('فشل في تحميل الإعلانات');
      } finally {
        setLoadingAds(false);
      }
    };

    fetchCategories();
    fetchAds();
  }, []);

  return (
    <div style={{ backgroundColor: '#eee', color: 'black', minHeight: '100vh', padding: '2rem' }}>
      <Container>
        <h2 className="text-center mb-5">الإعلانات</h2>
        {loadingAds ? <div className="text-center"><Spinner animation="border" variant="success" /></div>
          : <AdsGrid ads={ads} onClick={(itemId) => navigate(`/items/${itemId}`)} />}

        <h2 className="text-center mb-5">التصنيفات الرئيسية</h2>
        {loading ? <div className="text-center"><Spinner animation="border" variant="success" /></div>
          : error ? <Alert variant="danger" className="text-center">{error}</Alert>
          : <CategoriesGrid categories={categories} />}
      </Container>
    </div>
  );
};

export default MainCategories;
