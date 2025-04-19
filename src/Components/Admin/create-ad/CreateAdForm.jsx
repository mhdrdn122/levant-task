import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Cookie from 'cookie-universal';
import {
  DEFAULT_FROM_DATE,
  DEFAULT_TO_DATE,
  DEFAULT_HIDE_DATE,
  DEFAULT_IS_PANORAMA,
} from './constants';
import { ADD_ADS } from '../../../Api/api';
import { useNavigate } from 'react-router';

const CreateAdForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const cookies = Cookie();
  const token = cookies.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!title || !description || !image) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('from_date', DEFAULT_FROM_DATE);
    formData.append('to_date', DEFAULT_TO_DATE);
    formData.append('hide_date', DEFAULT_HIDE_DATE);
    formData.append('is_panorama', DEFAULT_IS_PANORAMA);

    try {
      setLoading(true);
      await axios.post(
        `${ADD_ADS}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,
          },
        }
      );

      setSuccess('تمت إضافة الإعلان بنجاح!');
      setTitle('');
      setDescription('');
      setImage(null);
      navigate("/admin/dashboard/show-ads")
    } catch (err) {
      console.error('تفاصيل الخطأ:', err.response)
    } finally {
      setLoading(false)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>عنوان الإعلان</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان الإعلان"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>وصف الإعلان</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="أدخل وصفًا مختصرًا"
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>صورة الإعلان</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>

      <div className="text-center">
        <Button
          variant="success"
          type="submit"
          disabled={loading}
          className="px-5 py-2"
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'إضافة'}
        </Button>
      </div>
    </Form>
  );
};

export default CreateAdForm;
