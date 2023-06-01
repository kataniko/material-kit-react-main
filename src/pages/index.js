import Head from 'next/head';
import { Box, Card, CardContent, Container, Unstable_Grid2 as Grid, Typography, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useEffect, useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { motion } from "framer-motion";

/**
 * The Page component.
 * @return {JSX.Element} A JSX.Element that represents the Page component.
 */
const Page = () => {

  /**
   * A state that determines whether the image is centered or not.
   * @type {[boolean, function]} Tuple containing the state value and its setter.
   */
  const [isImageCentered, setIsImageCentered] = useState(false);

  /**
   * A function that sets the isImageCentered state based on the current scroll position.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsImageCentered(true);
      } else {
        setIsImageCentered(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**

    A page for the LobaZone overview

    @typedef {object} Props

    @prop {string} component - The main component of the page

    @prop {object} sx - Custom styles for the component

    @prop {number} xs - The number of grid columns the item should occupy at extra-small breakpoints

    @prop {number} sm - The number of grid columns the item should occupy at small breakpoints

    @prop {number} md - The number of grid columns the item should occupy at medium breakpoints

    @prop {number} elevation - The elevation level of the card component

    @prop {object} sx - Custom styles for the card component

    @prop {string} className - The name of the class for the card component

    @prop {string} scene - The URL of the Spline scene

    @param {Props} props - The props object for the component

    @return {JSX.Element} - The JSX code for the component
    */

  return (
    <>
      <Head>
        <title>
          Overview | LobaZone
        </title>
      </Head>

      <Box
        component="main"
        sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)", overflow: "hidden" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={0} sx={{
              backgroundColor: "transparent", margin: 4,
            }} className='card2 '>
              <CardContent>

                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                >
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent variant='h6' sx={{ color: "white", textShadow: "2px 2px 10px black" }}></TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent sx={{ color: "white", textShadow: "2px 2px 10px black", maxWidth: "500px" }}>
                      <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
                        We are thrilled to have you here.
                        This repository is your go-to resource for accessing the latest code, tools, and documentation needed to make your work more efficient and effective.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <Box sx={{ width: "100%", height: "100%", }}>
              <Spline className='canvas' scene="https://prod.spline.design/qGCmBTUJtGFV9r4d/scene.splinecode" />
            </Box>
          </Grid>
        </Grid>

      </Box >

      {/**
        Renders a container with a maximum width of "md" and center aligned text.
        Displays a Typography component with variant "h4" that contains a description of the repository.
        @param {string} maxWidth - The maximum width of the container.
        @param {object} sx - The style object used to style the container.
        @returns {JSX.Element} - The rendered container with the Typography component.
      */}

      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2, color: "white", textShadow: "2px 2px 10px black" }}>
          This repository serves as a central hub for all of our projects.
          Here, you will find everything from design guidelines and coding standards to UI components and libraries.
          We have also included a range of tools and scripts that will help you automate common tasks and streamline your workflow.
        </Typography>
      </Container>
      {/**
      Renders a Card component with no elevation, a transparent background, and display set to flex.

      Displays a Spline component with a className of "canvas2" and a scene property that contains a spline design URL.

      Displays a Timeline component with two TimelineItem components.

      Each TimelineItem component contains a TimelineSeparator component, a TimelineDot component, and a TimelineContent component.

      The TimelineContent component in the second TimelineItem contains a Typography component with variant "h4" that contains a description of the repository.

      @param {number} elevation - The elevation of the Card component.

      @param {object} sx - The style object used to style the Card component, Timeline component, TimelineItem components, and TimelineContent components.

      @returns {JSX.Element} - The rendered Card component with Spline and Timeline components.
      */}

      <Card elevation={0} sx={{ display: "flex", justifyContent: "end", backgroundColor: "transparent" }}>
        <CardContent sx={{ maxWidth: "100%", marginRight: "auto", marginLeft: "auto", marginTop: "10%" }}>
          <Spline className='canvas2' scene="https://draft.spline.design/hLYq4szUWulqq0mO/scene.splinecode" />
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
