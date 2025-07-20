import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Router, Route } from './utils/router';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
