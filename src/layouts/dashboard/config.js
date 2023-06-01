import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

/**
 * An array of menu items containing their title, path and icon.
 * @typedef {Object} MenuItem
 * @property {string} title - The title of the menu item.
 * @property {string} path - The path of the menu item.
 * @property {JSX.Element} icon - The icon of the menu item.
 */

/**
 * An array of menu items.
 * @type {Array<MenuItem>}
 */
export const items = [
  {
    title: 'Repository',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="medium">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="medium">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="medium">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Login',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="medium">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Error',
    path: '/404',
    icon: (
      <SvgIcon fontSize="medium">
        <XCircleIcon />
      </SvgIcon>
    )
  }
];
