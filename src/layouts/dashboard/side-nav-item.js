
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';

/**
 * @typedef {Object} SideNavItemProps
 * @property {boolean} [active=false] - Indicates if the item is currently active
 * @property {boolean} [disabled] - Indicates if the item is disabled
 * @property {boolean} [external] - Indicates if the item is an external link
 * @property {node} [icon] - Icon element to display on the left of the item title
 * @property {string} [path] - Path for the item, used as href for internal links or href for external links if 'external' prop is true
 * @property {string} title - Title to display for the item
 */

/**
 * A navigation item component for a side navigation menu.
 * @param {SideNavItemProps} props - The props object for the component.
 * @returns {JSX.Element} - A JSX element representing the component.
 */
export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.09)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.09)'
          }
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'white',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'white'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'white',
            flexGrow: 1,
            textShadow:"1px 1px 1px black",
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 18,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color:"white"
            }),
            ...(disabled && {
              color: 'white'
            })
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  /**
   * Indicates if the item is currently active
   */
  active: PropTypes.bool,
  /**
   * Indicates if the item is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Indicates if the item is an external link
   */
  external: PropTypes.bool,
  /**
   * Icon element to display on the left of the item title
   */
  icon: PropTypes.node,
  /**
   * Path for the item, used as href for internal links or href for external links if 'external' prop is true
   */
  path: PropTypes.string,
  /**
   * Title to display for the item
   */
  title: PropTypes.string.isRequired
};