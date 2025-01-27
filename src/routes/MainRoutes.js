// project imports
import MainLayout from 'layout/MainLayout';
// dashboard routing
// utilities routing
import UtilsClients from 'views/manage/clients/Clients';
// sample page routing
import ClientSubscription from 'views/pages/client/ClientSubscription';
// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      children: [
        {
          path: 'files',
          element: <UtilsClients />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'subscriptions/clientId/:id',
          element: <ClientSubscription />
        }
      ]
    }
  ]
};

export default MainRoutes;
