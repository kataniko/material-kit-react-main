import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/repository-table';
import { applyPagination } from 'src/utils/apply-pagination';
import AddPost from '../components/addPost';
import Spline from '@splinetool/react-spline';

const now = new Date();


const Page = () => {

  const handleAddPost = async (postData) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      const newPost = await response.json();
      console.log('New post:', newPost);
      // do something with the new post, such as updating the state of the parent component
    } catch (error) {
      console.error(error);
      // handle error, such as displaying an error message to the user
    }
  }

  return (
    <>
      <Head>
        <title>
          Customers | LobaZone
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        
        }}
      >
      
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>

                <Typography variant="h4">
                  Repository
                </Typography>

              </Stack>

              <div>

                <AddPost onSubmit={handleAddPost} />

              </div>

            </Stack>

            <CustomersTable
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
