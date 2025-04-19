import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Spinner, Alert, Image } from 'react-bootstrap';
import axios from 'axios';
import Cookie from 'cookie-universal';
import { useNavigate } from 'react-router';
import {GET_ALL_ADS} from '../../Api/api'
import {DELETE_ADS} from '../../Api/api'


const AllAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate()


  const cookies = Cookie();
  const token = cookies.get('token');

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${GET_ALL_ADS}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setAds(response.data.data || []);
    } catch (err) {
      setError('فشل في تحميل الإعلانات');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('هل أنت متأكد أنك تريد حذف هذا الإعلان؟');
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${DELETE_ADS}${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setSuccessMsg('تم حذف الإعلان بنجاح');
      setAds((prev) => prev.filter((ad) => ad.id !== id));
    } catch (err) {
      setError('حدث خطأ أثناء الحذف');
      console.error(err);
    }
  };

  return (
    <Container className="py-5" style={{ backgroundColor: '#fff', color: '#000' }}>
      <h3 className="text-center mb-4">جميع الإعلانات</h3>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="success" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      {!loading && ads.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover responsive className="text-center">
            <thead style={{ backgroundColor: '#000', color: '#fff' }}>
              <tr>
                <th>#</th>
                <th>الصورة</th>
                <th>العنوان</th>
                <th>التاريخ</th>
                <th>الخيارات</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad, index) => (
                <tr key={ad.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={ad.image}
                      alt="ad"
                      width="100"
                      height="60"
                      style={{ objectFit: 'cover' }}
                      rounded
                    />
                  </td>
                  <td>{ad.title}</td>
                  <td>
                    {ad.from_date} - {ad.to_date}
                  </td>
                  <td>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/admin/dashboard/edit-ad/${ad.id}`)}
                  >
                    تعديل
                  </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(ad.id)}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        !loading && <Alert variant="info">لا توجد إعلانات لعرضها</Alert>
      )}
    </Container>
  );
};

export default AllAds;
