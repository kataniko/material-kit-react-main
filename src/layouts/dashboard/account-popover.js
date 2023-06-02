import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography, Button } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

/**
 * A popover that displays the user's account information and provides a sign-out button.
 *
 * @param {Object} props - The component props.
 * @param {any} props.anchorEl - The element that serves as the anchor for the popover.
 * @param {Function} props.onClose - The function to call when the popover is closed.
 * @param {boolean} props.open - Whether the popover should be displayed.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  /**
   * A callback function that signs the user out, closes the popover, and navigates to the login page.
   *
   * @returns {void}
   */
  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Tomás Oliveira
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem sx={{color:"black"}} onClick={handleSignOut}>
          <Button>Sign Out</Button>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  /**
   * The element that serves as the anchor for the popover.
   */
  anchorEl: PropTypes.any,
  /**
   * The function to call when the popover is closed.
   */
  onClose: PropTypes.func,
  /**
   * Whether the popover should be displayed.
   */
  open: PropTypes.bool.isRequired
};
