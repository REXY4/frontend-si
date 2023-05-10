// pages/index.tsx
import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import PrivateRoute from '@/components/PrivateRoute';
import Layout from '../components/layout';
import type { NextPageWithLayout } from './_app';

// eslint-disable-next-line react/function-component-definition
const Page: NextPageWithLayout = () => <p>hello world</p>;
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PrivateRoute>
        {page}
        {' '}
      </PrivateRoute>
    </Layout>

  );
};

export default Page;
