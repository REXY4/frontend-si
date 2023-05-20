// pages/index.tsx
import React from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { withAuth } from '@/src/helpers/PrivateRoute';
import Layout from '../components/layouts/layout';
import type { NextPageWithLayout } from './_app';
import LoginPage from './login';

// eslint-disable-next-line react/function-component-definition
const Page: NextPageWithLayout = () => <LoginPage />;
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default withAuth(Page);
