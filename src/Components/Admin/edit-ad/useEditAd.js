import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookie from 'cookie-universal';
import { GET_ONE_ADS } from '../../../Api/api';

export const useEditAd = (id) => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const cookies = Cookie();
  const token = cookies.get('token');

  const fetchAd = async () => {
    try {
      const res = await axios.get(
        `${GET_ONE_ADS}${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setAd(res.data.data);
    } catch (err) {
      setError('فشل في تحميل الإعلان');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAd();
  }, [id]);

  return { ad, loading, error };
};
