import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Typography, Button, FormHelperText, Stack, TextField } from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from 'src/hooks/use-auth';
import { firebase, auth } from "../../Services/Firebase"
import { minWidth } from '@mui/system';


/**
 * Page component for the login form
 * @returns {JSX.Element} The login form page
*/

const Page = () => {
  // useRouter hook for managing the Next.js router
  const router = useRouter();
  // useAuth hook for managing user authentication
  const auth = useAuth();
  // State hook for managing the login method (email or google)
  const [method, setMethod] = useState('email');
  // Formik hook for managing form state and validation
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123!',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // Attempt to sign in using the provided email and password
        await auth.signIn(values.email, values.password);
        // If successful, navigate to the home page
        router.push('/');
      } catch (err) {
        // If there is an error, update the form status and error state
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  /**
   * Handler for changing the login method between email and google
   * @param {React.SyntheticEvent} event - The event object from the method toggle
   * @param {string} value - The value (either "email" or "google") of the method toggle
   */

  const hadleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  /**
   * Function to skip the login process (for demo purposes only)
   */
  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );

  /**
   * Function to sign in with Google
   * @returns {Promise<firebase.auth.UserCredential>} The user credential from the Google sign-in process
   */
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider)
    return result
  }

  /**
  * Function to sign in using the user's email and password
  */
  const signIn = async () => {
    try {
      await auth.createUserWithEmailAndPassword(values.email, values.password);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Function to log the user out
   */

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>
          Login | LobaZone
        </title>
      </Head>
      <Box

        sx={{
          backgroundColor: 'transparent',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          minHeight: "100vh",
          borderRadius: "30px",
          
        }}
      >
        <Box
          className="card"
          sx={{
            maxWidth: 550,
            minWidth:400,
            display: "flex",
            px: 4,
            py: '50px',
            backgroundColor: 'rgba(255,255,255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: "0px 0px 10px black",
            borderRadius: "30px",
          }}
        >
          <span className='span' id="top"></span>
          <span className='span' id="right"></span>
          <span className='span' id="bottom"></span>
          <span className='span' id="left"></span>
          <div style={{ minWidth:300}}>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Login
              </Typography>

            </Stack>

            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >

              <Stack spacing={3}>

                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                />

                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                />

              </Stack>

              <FormHelperText sx={{ mt: 1, color: "black" }}>
                Optionally you can skip.
              </FormHelperText>

              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}

              <Button
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  backgroundColor: "black",
                  '&:hover': {
                    opacity: "80%",
                    backgroundColor: "black",
                  },
                }}
                type="submit"
                variant="contained"
                onClick={signIn}
              >
                Continue
              </Button>


              <Button
                variant='soft'
                fullWidth
                size="large"
                sx={{ mt: 3, color:"white" }}
                onClick={signInWithGoogle}
              >
                Sign with LOBA account
              </Button>

              

                {/* <div>
                  You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                </div> */}

             
            </form>

          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
