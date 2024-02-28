import { Styles, theme } from '../../../theme/theme';

export const header: Styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `solid 1px ${theme.palette.grey[400]}`,
  height: '100px'
};

export const content: Styles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};
