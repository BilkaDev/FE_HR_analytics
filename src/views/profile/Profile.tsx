import { Box, Typography } from '@mui/material';

import { useTranslate } from '../../contex/translations/useTranslate';
import { SelectedLanguage } from '../../components/uiElements/selectedLanguage/SelectedLanguage';
import { useProfile } from '../../common/hooks/useProfile';

import * as styles from './Profile.styles';

export const Profile = () => {
  const { profile } = useProfile();
  const translate = useTranslate();

  return (
    <Box sx={styles.container}>
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        marginBottom="3"
      >
        {translate('profile')}
      </Typography>
      <Box>
        <Typography component="span" fontWeight="600">
          {translate('your name')}:{' '}
        </Typography>
        <Typography component="span">{profile?.firstName}</Typography>
      </Box>
      <Box>
        <Typography component="span" fontWeight="600">
          {translate('your last name')}:{' '}
        </Typography>
        <Typography component="span">{profile?.lastName}</Typography>
      </Box>
      <Box>
        <Typography component="span" fontWeight="600">
          {translate('your email')}:{' '}
        </Typography>
        <Typography component="span">{profile?.email}</Typography>
      </Box>
      <Box sx={styles.languageContainer}>
        <Typography component="span" fontWeight="600">
          {translate('page language')}:{' '}
        </Typography>
        <SelectedLanguage
          sx={{ position: 'relative', top: 'auto', right: 'auto' }}
        />
      </Box>
    </Box>
  );
};
