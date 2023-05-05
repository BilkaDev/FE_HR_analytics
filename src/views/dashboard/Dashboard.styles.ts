import { Styles, theme } from 'theme/theme';

export const container: Styles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: 5,
  rowGap: 2
};

export const spanFull: Styles = {
  gridColumn: 'span 2'
};

export const generalTextWrapper: Styles = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: 2
};

export const grayedText: Styles = {
  color: theme.palette.grey[500]
};

export const summaryItemsContainer: Styles = {
  display: 'flex',
  justifyContent: 'space-between'
};
