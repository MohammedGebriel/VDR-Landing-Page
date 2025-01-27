// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconTrash,
  IconCalendarStar,
  IconFileDescription
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconCalendarStar,
  IconFileDescription,
  IconTrash
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Manage',
  type: 'group',
  children: [
    {
      id: 'util-files',
      title: 'Files',
      type: 'item',
      url: '/files',
      icon: icons.IconFileDescription,
      breadcrumbs: false
    }
  ]
};

export default utilities;
