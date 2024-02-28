import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar } from '@mui/material';
import moment from 'moment';
import 'moment/locale/pl';

import { getJobsUrl, Job as JobResponse } from '../../../api/request/job';
import { useTranslate } from '../../../contex/translations/useTranslate';
import { useLanguage } from '../../../contex/translations/translation';
import { useQueryCustom } from '../../../api/useQueryCustom';

import * as styles from './Job.styles';

export const Job = () => {
  const { id: jobId } = useParams();
  const { language } = useLanguage();
  const translate = useTranslate();
  const { data, isSuccess } = useQueryCustom<JobResponse>({
    queryKey: ['jobs', jobId],
    url: getJobsUrl(jobId)
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
            {data.data && data.data.title}
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
            {data.data.companyName}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="p">
            short description
          </Typography>
          <Typography component="p">{data.data.shortDescription}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="p">
            long description
          </Typography>
          <Typography component="p">{data.data.longDescription}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
