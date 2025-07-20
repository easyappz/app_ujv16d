import React, { useState } from 'react';
import { useNavigate } from '../utils/router';
import { instance } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/ui/Layout';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Link from '../components/ui/Link';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await instance.post('/api/login', formData);
      if (response.data.token) {
        login(response.data.user, response.data.token);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Form title="Вход" onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        <Input
          type="email"
          name="email"
          placeholder="Электронная почта"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </Button>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <Link to="/forgot-password">Забыли пароль?</Link>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span>Нет аккаунта? </span>
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      </Form>
    </Layout>
  );
};

export default Login;
