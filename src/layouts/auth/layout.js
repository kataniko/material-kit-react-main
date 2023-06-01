/**
 * Props for the Layout component.
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children - The children to be rendered inside the layout.
 */

import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import Image from 'next/image';


/**
 * The main layout component that wraps the entire app.
 * @param {LayoutProps} props - The props for the Layout component.
 * @returns {JSX.Element} - The JSX for the Layout component.
 */
export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',

      }}
    >
      <Grid
        container
        sx={{
          flex: '1 1 auto',
          justifyContent: "center",
          margin: 0,
          height: '100vh', // set the height to 100vh (100% of viewport height)
          width: '100%', // set the width to 100% of the parent container
        }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%',
              zIndex: 10,
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32,

              }}
            >
              <Image
                src="/loba.png"
                alt="My image"
                width={250}
                height={70}
              />
            </Box>
          </Box>
          {children}
        </Grid>

      </Grid>
    </Box>
  );
};

Layout.propTypes = {
  /**
   * The children to be rendered inside the layout.
   */
  children: PropTypes.node,
};
