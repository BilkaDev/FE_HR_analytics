import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar } from '@mui/material';
import moment from 'moment';
import 'moment/locale/pl';

import { useTranslate } from '../../../contex/translations/useTranslate';
import { useLanguage } from '../../../contex/translations/translation';
import {
  Candidate as CandidateResponse,
  getCandidateUrl
} from '../../../api/request/candidate';
import { useQueryCustom } from '../../../api/useQueryCustom';

import * as styles from './Candidate.styles';

export const Candidate = () => {
  const { id: candidateId } = useParams();
  if (!candidateId) throw new Error('Candidate missing in Candidate route');
  const { language } = useLanguage();
  const translate = useTranslate();
  const { data, isSuccess } = useQueryCustom<CandidateResponse>({
    queryKey: ['candidates, candidateId'],
    url: getCandidateUrl(candidateId)
  });

  if (!isSuccess) return null;
  const formattedDate = moment(data.data.createdAt)
    .locale(language.locale)
    .format('DD MMMM YYYY');

  return (
    <Box>
      <Box sx={styles.header}>
        <Box display="flex" gap={2}>
          <Avatar alt="logo company" src={data.data.logo} />
          <Typography variant="h4" component="p">
            {data.data.name}
          </Typography>
        </Box>
        <Box>
          <Typography component="p">
            {translate('date')} {formattedDate}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.content}>
        <Box>
          <Typography variant="h6" component="p">
            {translate('company Name')}
          </Typography>
          <Typography component="p">{data.data.companyName}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="p">
            {translate('position')}
          </Typography>
          <Typography component="p">{data.data.position}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="p">
            {translate('short description')}
          </Typography>
          <Typography component="p">{data.data.shortDescription}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="p">
            {translate('long description')}
          </Typography>
          <Typography component="p">{data.data.longDescription}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
