import UnAuthGuard from 'layout/MainLayout/Guards/UnAuthGuard';
import { Outlet } from 'react-router-dom';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <UnAuthGuard>
    <Outlet />
  </UnAuthGuard>
);

export default MinimalLayout;
