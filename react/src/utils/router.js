import React, { useState, useEffect } from 'react';

// Simple router hook for navigation without react-router-dom
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return { path: currentPath, navigate };
};

// Hook to use navigation
export const useNavigate = () => {
  const { navigate } = useRouter();
  return navigate;
};

// Simple Router component to handle routes
export const Router = ({ children }) => {
  const { path } = useRouter();
  let matchedChild = null;

  React.Children.forEach(children, (child) => {
    if (child.props.path === path) {
      matchedChild = child;
    }
  });

  return matchedChild ? matchedChild : children[0];
};

// Route component to define a route
export const Route = ({ path, children }) => {
  return children;
};
