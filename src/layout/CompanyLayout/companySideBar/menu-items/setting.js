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

const settings = {
  id: 'settings',
  title: 'Setting',
  type: 'group',
  children: [
    {
      id: 'util-personal',
      title: 'Personal',
      type: 'item',
      url: '/setting-personal',
      icon: icons.IconFileDescription,
      breadcrumbs: false
    },
    {
      id: 'util-project',
      title: 'Project',
      type: 'item',
      url: '/setting-project',
      icon: icons.IconCalendarStar,
      breadcrumbs: false
    }
  ]
};

export default settings;
