import React, { useState } from 'react';
import { useNavigate } from '../utils/router';
import { register } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/ui/Layout';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Link from '../components/ui/Link';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await register(formData);
      if (response.token) {
        login(response.user, response.token);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Form title="Регистрация" onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        <Input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </Button>
        <div style={{ textAlign: 'center' }}>
          <span>Уже есть аккаунт? </span>
          <Link to="/login">Войти</Link>
        </div>
      </Form>
    </Layout>
  );
};

export default Register;
