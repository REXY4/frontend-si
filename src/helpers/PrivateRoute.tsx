import React from 'react';
import { getCookie } from "cookies-next";
import LoginPage from '@/pages/login';

export const withAuth = (Component:any) => {
  const Auth = (props:any) => {
   const isLoggedIn = getCookie("token") != undefined;
    if (!isLoggedIn) {
      return window.location.replace("/login");
    }
    return (
      <Component {...props} />
    );
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};
