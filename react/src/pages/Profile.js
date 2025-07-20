import React, { useEffect, useState } from 'react';
import { useNavigate } from '../utils/router';
import { getProfile } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/ui/Layout';
import Button from '../components/ui/Button';
import './Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        setUserData(response.user);
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке профиля');
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [currentUser, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Layout>
        <p>Загрузка...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p style={{ color: 'red' }}>{error}</p>
        <Button onClick={() => navigate('/login')}>Вернуться к входу</Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-container">
        <h2>Профиль пользователя</h2>
        {userData && (
          <div className="profile-details">
            <p>
              <strong>Имя:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        )}
        <Button variant="primary" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </Layout>
  );
};

export default Profile;
