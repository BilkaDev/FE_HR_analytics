import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTranslate } from '../../../contex/translations/useTranslate';
import { useMutationCustom } from '../../../api/useMutationCustom';
import { useSnackbar } from '../../../contex/snackbarContext/useSnackbar';
import {
  addCandidateSchema,
  AddCandidateSchemaType
} from '../../../api/request/candidate';

import * as styles from './AddCandidate.styles';

export const AddCandidate = () => {
  const translate = useTranslate();
  const { showSnackbar } = useSnackbar();
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<AddCandidateSchemaType>({
    resolver: zodResolver(addCandidateSchema(translate))
  });

  const { mutate, isLoading, isError, error } = useMutationCustom({
    mutationFn: axios => (payload: AddCandidateSchemaType) =>
      axios.post('/candidates', payload),
    onSuccess: () => showSnackbar(translate('candidate has been added!'))
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
            {...register('name')}
            sx={styles.input}
            variant="outlined"
            label={translate('candidate name')}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
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
          <TextField
            {...register('position')}
            sx={styles.input}
            variant="outlined"
            label={translate('job title')}
            fullWidth
            error={Boolean(errors.position)}
            helperText={errors.position?.message}
          />
        </Grid>
        <Grid item xs={12}>
          {isError && <Typography color="error">{error}</Typography>}
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
