import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

/**
 * Renders the Settings page component.
 * @return {JSX.Element} The Settings page component.
 */
const Page = () => (
  <>
    <Head>
      <title>
        Settings | LobaZone
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Settings
          </Typography>
          <SettingsNotifications />
        </Stack>
      </Container>
    </Box>
  </>
);

/**
 * Returns the DashboardLayout with the specified page as a child.
 * @param {JSX.Element} page - The page to be rendered as a child of DashboardLayout.
 * @return {JSX.Element} The DashboardLayout component with the specified page as a child.
 */
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
