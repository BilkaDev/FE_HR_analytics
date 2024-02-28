import { Box, CircularProgress, Typography } from '@mui/material';
import {
  ImportantDevices,
  PersonOutline,
  ShowChart
} from '@mui/icons-material';

import { useTranslate } from '../../contex/translations/useTranslate';
import { JOBS_URL, JobsResponse } from '../../api/request/job';
import { CANDIDATE_URL, CandidatesResponse } from '../../api/request/candidate';
import { useQueryCustom } from '../../api/useQueryCustom';

import * as styles from './Dashboard.styles';
import { DashboardItem } from './dashboardItem/DashboardItem';
import { SummaryItem } from './summaryItem/SummaryItem';

export const Dashboard = () => {
  const translate = useTranslate();
  const jobsState = useQueryCustom<JobsResponse>({
    queryKey: ['jobs'],
    url: JOBS_URL
  });

  const candidatesState = useQueryCustom<CandidatesResponse>({
    queryKey: ['candidates'],
    url: CANDIDATE_URL
  });

  return (
    <Box sx={styles.container}>
      <DashboardItem>
        <Typography variant="h5" component="p">
          {translate('open positions')}
        </Typography>
        {jobsState.isLoading && <CircularProgress />}
        {jobsState.error && (
          <Typography color="error">{jobsState.error}</Typography>
        )}
        <Typography variant="h5" component="p">
          {jobsState.data && jobsState.data.data.length}
        </Typography>
      </DashboardItem>
      <DashboardItem>
        <Typography variant="h5" component="p">
          {translate('candidates')}
        </Typography>
        {candidatesState.isLoading && <CircularProgress />}
        {candidatesState.error && (
          <Typography color="error">{candidatesState.error}</Typography>
        )}
        <Typography variant="h5" component="p">
          {candidatesState.data && candidatesState.data.data.length}
        </Typography>
      </DashboardItem>
      <Box sx={styles.spanFull}>
        <DashboardItem>
          <Box sx={styles.generalTextWrapper}>
            <Typography variant="h5" component="p">
              {translate('general')}
            </Typography>
            <Typography variant="h5" component="span" fontWeight={600}>
              Total 48.5% growth 😎
            </Typography>
            <Typography component="span" sx={styles.grayedText}>
              {' '}
              this month
            </Typography>
            <Box sx={styles.summaryItemsContainer}>
              <SummaryItem
                iconVariant="blue"
                icon={<ShowChart color="inherit" />}
                value="245"
                name={translate('employees')}
              />
              <SummaryItem
                iconVariant="green"
                icon={<PersonOutline color="inherit" />}
                value={
                  jobsState.isLoading ? (
                    <CircularProgress />
                  ) : (
                    candidatesState.data &&
                    Object.keys(candidatesState.data).length
                  )
                }
                name={translate('candidates')}
              />
              <SummaryItem
                iconVariant="yellow"
                icon={<ImportantDevices color="inherit" />}
                value="1.23k"
                name={translate('interviews')}
              />
            </Box>
          </Box>
        </DashboardItem>
      </Box>
    </Box>
  );
};
