import { Box, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../AppRoute';
import { useTranslate } from '../../contex/translations/useTranslate';

import * as styles from './Home.styles';

export const Home = () => {
  const translate = useTranslate();
  return (
    <Paper sx={styles.container}>
      <Typography sx={styles.title} variant="h1">
        HR analytics
      </Typography>
      <Box sx={styles.buttonsContainer}>
        <Button
          sx={styles.button}
          component={Link}
          to={AppRoute.signIn}
          variant="contained"
        >
          {translate('sign in')}
        </Button>
        <Button
          sx={styles.button}
          component={Link}
          to={AppRoute.signUp}
          variant="contained"
        >
          {translate('sign up')}
        </Button>
      </Box>
    </Paper>
  );
};
