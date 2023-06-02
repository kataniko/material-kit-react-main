/**
  @module TopNav
  @desc The top navigation bar component of the application.
  @param {Object} props - The component props.
  @param {boolean} props.isNavOpen - Whether the side navigation is open or not.
  @param {function} props.onNavOpen - Callback function to handle opening the side navigation.
  @returns {JSX.Element} - The TopNav component.
*/

import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Button,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { useState, useEffect, useRef } from "react"
import { List, ListItem, ListItemText, Modal, Backdrop, Fade, Typography, Popover } from '@mui/material';
import axios from 'axios';

// Constants for the side nav and top nav dimensions.
const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

/**

   Initializes state and hooks to handle top navigation component
   @param {Object} props - Props object containing onNavOpen function
   @returns {JSX.Element} - Top navigation component JSX
   */

export const TopNav = (props) => {

  const { onNavOpen } = props;

  /**
  
    Indicates if viewport is greater than or equal to large breakpoint
    @type {boolean}
  */

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  /**
    Popover hook to handle account information
    @type {Object}
  */

  const accountPopover = usePopover();

  /**
    State hook to handle open/close of user list modal
    @type {[boolean, function]}
  */

  const [open, setOpen] = useState(false);

  /**
  
    State hook to store response data from repository API
    @type {[Object[], function]}
  */

  const [data, setData] = useState([]);

  /**
    State hook to store loading status of API request
    @type {[boolean, function]}
  */

  const [loading, setLoading] = useState(true);

  /**
    State hook to store error message from API request
    @type {[string, function]}
  */

  const [error, setError] = useState(null);

  /**
  
    Reference to button element to anchor user list modal
    @type {Object}
  */

  const buttonRef = useRef(null);

  /**
    Opens user list modal
    @returns {void}
  */

  const handleOpen = () => {
    setOpen(true);
  };

  /**
  
    Closes user list modal
    @returns {void}
  */

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get('https://96831636-143e-46c8-8869-990ecc7937b0.mock.pstmn.io/repositorio')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const UserListModal = ({ open, onClose }) => {
    return (
      <Popover
        open={open}
        anchorEl={buttonRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Fade in={open}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
            <Typography variant="h5" style={{ marginBottom: '10px', backgroundColor:"black", borderRadius:5,padding:0, textAlign:"center", fontSize:17 }}>User List</Typography>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
              <List>
                {data.map(user => (
                  <ListItem key={user.id}>
                    <ListItemText sx={{color:"black"}} primary={`${user.id}: ${user.name}`} />
                  </ListItem>
                ))}
              </List>
            )}
          </div>
        </Fade>
      </Popover>
    );
  };
  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: "transparent",
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: 20
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Contacts">
              <IconButton onClick={handleOpen}>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
          </Stack>
        </Stack>
      </Box>

      <UserListModal open={open} onClose={handleClose} />

      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
}