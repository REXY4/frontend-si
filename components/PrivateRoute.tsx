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

  return <div>children</div>;
}

export default PrivateRoute;

// const withAuth = Component => {
//   const Auth = (props) => {
//     // Login data added to props via redux-store (or use react context for example)
//     const { isLoggedIn } = props;

//     // If user is not logged in, return login component
//     if (!isLoggedIn) {
//       return (
//         <Login />
//       );
//     }

//     // If user is logged in, return original component
//     return (
//       <Component {...props} />
//     );
//   };

//   // Copy getInitial props so it will run as well
//   if (Component.getInitialProps) {
//     Auth.getInitialProps = Component.getInitialProps;
//   }

//   return Auth;
// };

// export default withAuth;
