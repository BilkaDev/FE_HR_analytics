import { Paper } from '@mui/material';

import { DashboardItemProps } from './DashboardItemProps';
import * as styles from './DashboardItem.styles';

export const DashboardItem = ({ children }: DashboardItemProps) => {
  return <Paper sx={styles.container}>{children}</Paper>;
};
