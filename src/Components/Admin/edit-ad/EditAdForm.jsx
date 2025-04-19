import React, { useState } from 'react';
import {
  Form,
  Button,
  Alert,
  Spinner,
  Image,
} from 'react-bootstrap';
import axios from 'axios';
import Cookie from 'cookie-universal';
import {
  DEFAULT_FROM_DATE,
  DEFAULT_TO_DATE,
  DEFAULT_HIDE_DATE,
  DEFAULT_IS_PANORAMA,
} from './constants';
import { UPDATE_ADS } from '../../../Api/api';

const EditAdForm = ({ ad, id, onSuccess }) => {
  const cookies = Cookie();
  const token = cookies.get('token');

  const [title, setTitle] = useState(ad?.title || '');
  const [description, setDescription] = useState(ad?.description || '');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !description) {
      setError('يرجى ملء جميع الحقول');
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('from_date', DEFAULT_FROM_DATE);
    formData.append('to_date', DEFAULT_TO_DATE);
    formData.append('hide_date', DEFAULT_HIDE_DATE);
    formData.append('is_panorama', DEFAULT_IS_PANORAMA);
    if (image) formData.append('image', image);

    try {
      setLoading(true);
      await axios.post(
        `${UPDATE_ADS}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setSuccess('تم تعديل الإعلان بنجاح!');
      onSuccess && onSuccess();
    } catch (err) {
      setError('فشل في تعديل الإعلان');
    } finally {
      setLoading(false);
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
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>وصف الإعلان</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>صورة حالية</Form.Label>
        <div className="mb-2">
          <Image src={ad?.image} alt="ad" width={100} height={60} rounded />
        </div>
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
          {loading ? <Spinner animation="border" size="sm" /> : 'تعديل الإعلان'}
        </Button>
      </div>
    </Form>
  );
};

export default EditAdForm;
