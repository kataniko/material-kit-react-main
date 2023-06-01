import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import styles from "../styles/styles.css"

// Create an emotion cache instance for the client-side
const clientSideEmotionCache = createEmotionCache();

/**
 * Renders a splash screen component
 */
const SplashScreen = () => null;

/**
 * The main App component
 * @param {Object} props - The component props
 * @param {Object} props.Component - The page component to render
 * @param {Object} [props.emotionCache=clientSideEmotionCache] - The Emotion cache to use
 * @param {Object} props.pageProps - The page component props
 */
const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Custom hook to display a progress bar during page transitions
  useNProgress();

  // Get the layout function from the page component, or use a default function
  const getLayout = Component.getLayout ?? ((page) => page);

  // Create the MUI theme
  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          LobaGround
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Use the AuthConsumer to check if the user is still loading */}
            <AuthConsumer>
              {
                (auth) => auth.isLoading
                  ? <SplashScreen />
                  : getLayout(<Component  {...pageProps} />)
              }
            </AuthConsumer>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
