import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTranslate } from '../../../contex/translations/useTranslate';
import { useMutationCustom } from '../../../api/useMutationCustom';
import { useSnackbar } from '../../../contex/snackbarContext/useSnackbar';
import {
  addJobSchema,
  AddJobSchemaType,
  JOBS_URL
} from '../../../api/request/job';

import * as styles from './AddJob.styles';

export const AddJob = () => {
  const { showSnackbar } = useSnackbar();
  const translate = useTranslate();
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<AddJobSchemaType>({
    resolver: zodResolver(addJobSchema(translate))
  });

  const { error, isLoading, mutate } = useMutationCustom({
    mutationFn: axios => (payload: AddJobSchemaType) =>
      axios.post(JOBS_URL, payload),
    onSuccess: () => showSnackbar(translate('job offer has been added!'))
  });

  return (
    <Box sx={styles.container}>
      <Grid
        container
        spacing={3}
        component="form"
        sx={styles.form}
        onSubmit={handleSubmit(data => mutate(data))}
      >
        <Grid item xs={6}>
          <TextField
            {...register('title')}
            sx={styles.input}
            variant="outlined"
            label={translate('job title')}
            fullWidth
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('companyName')}
            sx={styles.input}
            variant="outlined"
            label={translate('company Name')}
            fullWidth
            error={Boolean(errors.companyName)}
            helperText={errors.companyName?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('logo')}
            sx={styles.input}
            variant="outlined"
            label={translate('logo')}
            fullWidth
            error={Boolean(errors.logo)}
            helperText={errors.logo?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('shortDescription')}
            sx={styles.input}
            variant="outlined"
            label={translate('short description')}
            fullWidth
            error={Boolean(errors.shortDescription)}
            helperText={errors.shortDescription?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('longDescription')}
            multiline
            rows={4}
            sx={styles.input}
            variant="outlined"
            label={translate('long description')}
            fullWidth
            error={Boolean(errors.longDescription)}
            helperText={errors.longDescription?.message}
          />
        </Grid>

        <Grid item xs={12}>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
          >
            {translate('submit')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
