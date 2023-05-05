import { Box, Typography } from '@mui/material';

import { mergeSx } from '../../../common/mergeSx/mergeSx';

import { SummaryItemProps } from './SummaryItem.types';
import * as styles from './SummaryItem.styles';

export const SummaryItem = ({
  name,
  value,
  icon,
  iconVariant
}: SummaryItemProps) => {
  return (
    <Box sx={styles.wrapper}>
      <Box
        sx={mergeSx(
          styles.iconContainer,
          styles.iconVariantToColor[iconVariant]
        )}
      >
        {icon}
      </Box>
      <Box sx={styles.contentWrapper}>
        <Typography sx={styles.name}>{name}</Typography>
        <Typography variant="h5">{value}</Typography>
      </Box>
    </Box>
  );
};
