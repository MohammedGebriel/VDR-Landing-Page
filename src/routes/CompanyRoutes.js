// project imports
import ThemeColors from 'Components/ThemeColors';
import CompanyLayout from 'layout/CompanyLayout';
import Documents from 'views/company/documents/Documents';
import Favourites from 'views/company/favourite/Favourites';
import FolderShow from 'views/company/folderShow/FolderShow';
import GroupShow from 'views/company/groupShow/GroupShow';
import Members from 'views/company/members/Members';
import Participants from 'views/company/participants/Participants';
import Permissions from 'views/company/permissions/Permissions';
import Quality from 'views/company/qualityAssurance/Quality';
import Setting from 'views/company/setting/Setting';
import Trash from 'views/company/trash/Trash';
import DashboardDefault from 'views/dashboard/Default';

// ==============================|| MAIN ROUTING ||============================== //

const CompanyRoutes = {
  path: '/',
  element: <CompanyLayout />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'documents',
      element: <Documents />
    },

    {
      path: 'folder/:id',
      element: <FolderShow />
    },
    {
      path: 'group/:id',
      element: <GroupShow />
    },
    {
      path: 'favourites',
      element: <Favourites />
    },
    {
      path: 'members',
      element: <Members />
    },
    {
      path: 'participants',
      element: <Participants />
    },
    {
      path: 'permissions',
      element: <Permissions />
    },
    {
      path: 'trash',
      element: <Trash />
    },
    {
      path: 'colors',
      element: <ThemeColors />
    },
    {
      path: 'qa',
      element: <Quality />
    },
    {
      path: 'setting',
      element: <Setting />
    }
  ]
};

export default CompanyRoutes;
