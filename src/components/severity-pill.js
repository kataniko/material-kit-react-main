/**
 * @typedef {object} SeverityPillProps
 * @property {React.ReactNode} [children] - The content to be displayed within the pill
 * @property {'primary'|'secondary'|'error'|'info'|'warning'|'success'} [color='primary'] - The color of the pill
 */

/**
 * A styled component that renders a severity pill with the given color
 * @param {SeverityPillProps} props - The props object for the component
 * @returns {JSX.Element} - The JSX element for the severity pill
 */
export const SeverityPill = (props) => {
  const { color = 'primary', children, ...other } = props;

  const ownerState = { color };

  /**
   * The styles for the SeverityPillRoot component
   * @param {Object} theme - The MUI theme object
   * @param {Object} ownerState - The owner state object that contains the color of the pill
   * @returns {Object} - The style object for the component
   */
  const SeverityPillRoot = styled('span')(({ theme, ownerState }) => {
    const backgroundColor = theme.palette[ownerState.color].alpha12;
    const color = theme.palette.mode === 'dark'
      ? theme.palette[ownerState.color].main
      : theme.palette[ownerState.color].dark;

    return {
      alignItems: 'center',
      backgroundColor,
      borderRadius: 12,
      color,
      cursor: 'default',
      display: 'inline-flex',
      flexGrow: 0,
      flexShrink: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 2,
      fontWeight: 600,
      justifyContent: 'center',
      letterSpacing: 0.5,
      minWidth: 20,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      textTransform: 'uppercase',
      whiteSpace: 'nowrap'
    };
  });

  return (
    <SeverityPillRoot
      ownerState={ownerState}
      {...other}
    >
      {children}
    </SeverityPillRoot>
  );
};

SeverityPill.propTypes = {
  /**
   * The content to be displayed within the pill
   */
  children: PropTypes.node,
  /**
   * The color of the pill
   */
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'info',
    'warning',
    'success'
  ])
};
