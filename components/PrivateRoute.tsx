import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

interface PrivateRouteProps {
    children: ReactNode;
}

function PrivateRoute({
  children,
}:PrivateRouteProps) {
  const Router = useRouter();
  const isLogin = false;
  useEffect(() => {
    if (!isLogin) {
      Router.push('/login');
    }
  }, [isLogin]);

  return children;
}

export default PrivateRoute;
