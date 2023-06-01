/**
 * @typedef {import('next/navigation').Pathname} Pathname
 * @typedef {import('@mui/material').Theme} Theme
 * @typedef {{
*   active: boolean,
*   disabled: boolean,
*   external: boolean,
*   icon: React.ReactNode,
*   path: Pathname,
*   title: string
* }} SideNavItemProps
* @typedef {{
*   onClose?: () => void,
*   open?: boolean
* }} SideNavProps
*/


import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import Spline from '@splinetool/react-spline';

/**
* SideNav component.
*
* @param {SideNavProps} props - The props of the SideNav component.
* @returns {JSX.Element} The SideNav component.
*/

export const SideNav = (props) => {

  const { open, onClose } = props;
  /**
   * The current pathname.
   *
   * @type {Pathname}
   */

  const pathname = usePathname();

  /**
   * Whether the viewport is at least "lg" size.
   *
   * @type {boolean}
   */
  const lgUp = useMediaQuery((theme /** @type {Theme} */) => theme.breakpoints.up('lg'));

  /**
   * The content of the SideNav.
   *
   * @type {JSX.Element}
   */



  const content = (
   
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor:"transparent"
        }}
      >
        <Box sx={{ p: 3, textAlign: "Left" }}>

          <Spline scene="https://prod.spline.design/rsMo7j0kAUxRJoex/scene.splinecode" />

        </Box>
       
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'black' }} />
      </Box>
    
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            color: 'Black',
            width: 280,
            backgroundColor: 'rgba(211, 211, 211, 0.1)',
            backdropFilter: 'blur(6px)',
            boxShadow: "2px 2px 10px black",
            borderRight:"0px"
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  /**
 * Renders a Drawer component with different settings based on screen size.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onClose - The function to be called when the Drawer should be closed.
 * @param {boolean} props.open - Whether the Drawer should be open or not.
 * @param {Object} props.content - The content to be displayed inside the Drawer.
 * @param {boolean} lgUp - Whether the screen size is larger than a specific breakpoint or not.
 *
 * @returns {JSX.Element} A JSX element representing the Drawer component with the specified settings.
 */

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(211, 211, 211, 0.2 )',
          backdropFilter: 'blur(2px)',
          boxShadow: "2px 2px 10px black",
          width: 280,
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
