import { useCallback } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppRoute } from '../../AppRoute';
import { useTranslate } from '../../contex/translations/useTranslate';
import { useMutationCustom } from '../../api/useMutationCustom';
import {
  REGISTER_URL,
  signUpSchema,
  SignUpSchemaType
} from '../../api/request/auth';

import * as styles from './SignUp.styles';

export const SignUp = () => {
  const translate = useTranslate();
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema(translate))
  });

  const { mutate, error, isLoading } = useMutationCustom({
    mutationFn: axios => (payload: Omit<SignUpSchemaType, 'retypePassword'>) =>
      axios.post(REGISTER_URL, payload),
    httpErrorMap: {
      '409': translate('email is already registered')
    }
  });

  const handleMutation = useCallback(
    async (payload: SignUpSchemaType) => {
      const { retypePassword, ...validApiPayload } = payload;
      await mutate(validApiPayload);
    },
    [mutate]
  );
  return (
    <Paper sx={styles.container}>
      <Typography variant="h4" component="h1">
        {translate('sign up')}
      </Typography>
      <Box
        component="form"
        sx={styles.form}
        onSubmit={handleSubmit(handleMutation)}
      >
        <TextField
          variant="standard"
          label={translate('first name *')}
          {...register('firstName')}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          fullWidth
        />
        <TextField
          variant="standard"
          label={translate('last name *')}
          {...register('lastName')}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          fullWidth
        />
        <TextField
          variant="standard"
          label={translate('email *')}
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          variant="standard"
          label={translate('password *')}
          type="password"
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          fullWidth
        />
        <TextField
          variant="standard"
          label={translate('retype password *')}
          type="password"
          {...register('retypePassword')}
          error={Boolean(errors.retypePassword)}
          helperText={errors.retypePassword?.message}
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" disabled={isLoading}>
          {translate('sign up')}
        </Button>
      </Box>
      <Typography>
        {translate('already Have An Account? Then')}{' '}
        <Link to={AppRoute.signIn}>{translate('sign in')}</Link>
      </Typography>
    </Paper>
  );
};
