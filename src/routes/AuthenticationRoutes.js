// project imports
import MinimalLayout from 'layout/MinimalLayout';
import Preview from 'views/company/documents/preivew/Preview';
import LandingPage from 'views/landingPage/LandingPage';
import Error404 from 'views/pages/404/Error404';
import Login from 'views/pages/authentication/authentication/Login';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: 'preview/:id',
      element: <Preview />
    },
    {
      path: '*',
      element: <Error404 />
    },
    {
      index: true,
      element: <LandingPage />
    }
  ]
};

export default AuthenticationRoutes;
