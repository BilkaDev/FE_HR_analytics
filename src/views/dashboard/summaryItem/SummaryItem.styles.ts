import { Styles, theme } from '../../../theme/theme';

import { IconVariant } from './SummaryItem.types';

export const wrapper: Styles = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5
};

export const contentWrapper: Styles = {
  display: 'flex',
  flexDirection: 'column'
};

export const name: Styles = {
  color: theme.palette.grey[400]
};

export const iconVariantToColor: Record<IconVariant, Styles> = {
  blue: {
    backgroundColor: '#0c75d1'
  },
  green: {
    backgroundColor: '#17d3a7'
  },
  yellow: {
    backgroundColor: '#f7c627'
  }
};

export const iconContainer: Styles = {
  padding: 1.5,
  borderRadius: 2,
  color: '#fff',
  display: 'grid',
  placeItems: 'center'
};
