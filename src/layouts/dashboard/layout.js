import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from './side-nav';

import { TopNav } from './top-nav';

/**
 * The width of the side navigation.
 */
const SIDE_NAV_WIDTH = 280;

/**
 * The root element of the layout.
 *
 * @param {Object} props - The props for the Layout component.
 * @param {ReactNode} props.children - The children to render inside the layout.
 * @returns {JSX.Element} The rendered layout.
 */
const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

/**
 * The container element of the layout.
 *
 * @returns {JSX.Element} The rendered layout container.
 */
const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
});

/**
 * The Layout component, which wraps the main content with the side navigation and top navigation.
 *
 * @param {Object} props - The props for the Layout component.
 * @param {ReactNode} props.children - The children to render inside the layout.
 * @returns {JSX.Element} The rendered layout.
 */
export const Layout = withAuthGuard((props) => {
  const { children } = props;

  /**
   * The current pathname of the page.
   *
   * @type {string}
   */
  const pathname = usePathname();

  /**
   * The state of the side navigation, whether it's open or closed.
   *
   * @type {boolean}
   */
  const [openNav, setOpenNav] = useState(false);

  /**
   * The callback function to handle pathname changes.
   */
  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  /**
   * The effect to handle pathname changes.
   */
  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <div >
  
        <TopNav onNavOpen={() => setOpenNav(true)} />
        <SideNav
          onClose={() => setOpenNav(false)}
          open={openNav}
        />
        <LayoutRoot>
          <LayoutContainer>
            {children}
          </LayoutContainer>
        </LayoutRoot>
      </div>
    </>
  );
});
