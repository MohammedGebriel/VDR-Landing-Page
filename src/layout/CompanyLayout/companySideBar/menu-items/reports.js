// assets
import { IconUsersGroup } from '@tabler/icons-react';

// ==============================|| reports MENU ITEMS ||============================== //

const reports = {
  id: 'reports',
  title: 'Reports',
  type: 'group',
  children: [
    {
      id: 'util-members',
      title: 'Members',
      type: 'item',
      url: '/members',
      icon: IconUsersGroup,
      breadcrumbs: false
    }
  ]
};

export default reports;
