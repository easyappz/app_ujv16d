import React, { useState } from 'react';
import { useNavigate } from '../utils/router';
import { instance } from '../api/axios';
import Layout from '../components/ui/Layout';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Link from '../components/ui/Link';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await instance.post('/api/forgot-password', { email });
      setMessage(response.data.message || 'Инструкции отправлены на вашу почту');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при отправке запроса');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Form title="Восстановление пароля" onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        {message && <p style={{ color: 'green', marginBottom: '16px' }}>{message}</p>}
        <Input
          type="email"
          name="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Отправить инструкции'}
        </Button>
        <div style={{ textAlign: 'center' }}>
          <span>Вспомнили пароль? </span>
          <Link to="/login">Войти</Link>
        </div>
      </Form>
    </Layout>
  );
};

export default ForgotPassword;
