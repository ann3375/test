import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootStoreContext } from '../../../store/RootStore';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { Wrapper } from '../../atoms/Wrapper';
import { CaptchaBlock } from '../../molecules/CaptchaBlock';
import { FormInput } from '../../molecules/FormInput';
import { ButtonSize, ButtonType, ButtonVariant } from '../../atoms/Button/types/types';
import { InputId, InputSize, InputType } from '../../molecules/FormInput/types/types';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { convertDataToFormData } from '../../../utils/convertDataToFormData';
import { defineFieldError } from '../../../utils/defineFieldError';
import { SCREENS } from '../../../router/endpoints';

import './loginForm.scss';

interface IFormInput {
  login: string;
  password: string;
  captcha: string;
}

const schema = yup.object().shape({
  login: yup
    .string()
    .min(2, 'Your name must contain at least 2 letters')
    .max(25, 'Your name must be less than 50 letters')
    .required('Please input your name'),
  password: yup.string().required('Please input your password'),
  captcha: yup
    .string()
    .min(5, 'Min 5 symbols')
    .max(5, 'Max 5 symbols')
    .required('Please input captcha'),
});

export const LoginForm = observer((): React.ReactElement => {
  const { userStore } = React.useContext(RootStoreContext);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FieldValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      login: '',
      password: '',
      captcha: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    const accessToken = await userStore.sendUserAuthData<string>(
      convertDataToFormData(formData),
      '/auth/login'
    );

    accessToken && userStore.setAccessToken(accessToken);
  };

  useEffect(() => {
    if (userStore.userAuthDataError && isSubmitSuccessful) {
      defineFieldError(userStore.userAuthDataError, setError);
    }
  }, [setError, userStore, isSubmitSuccessful, userStore.userAuthDataError]);

  return (
    <Wrapper className="form-login">
      <Typography className="form-login__text" variant={TypographyTypeStyle.h2}>
        Please, autorize yourself
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={InputId.login}
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder={'User name'}
              type={InputType.text}
              labelText="User name"
              className="form-login__input"
              field={field}
              errorText={errors.login?.message}
            />
          )}
        />

        <Controller
          name={InputId.password}
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder={'Input password'}
              type={InputType.password}
              labelText="Password"
              className="form-login__input"
              field={field}
              errorText={errors.password?.message}
            />
          )}
        />

        <Wrapper flex className="form-login__security-code">
          <Controller
            name={InputId.captcha}
            control={control}
            render={({ field }) => (
              <FormInput
                placeholder={'Security code'}
                type={InputType.text}
                labelText="Security code"
                className="form-login__input"
                field={field}
                size={InputSize.medium}
                errorText={errors.captcha?.message}
              />
            )}
          />
          <CaptchaBlock />
        </Wrapper>

        <Wrapper flex className="form-login__buttons">
          <Button
            className="form-login__button"
            variant={ButtonVariant.primary}
            size={ButtonSize.medium}
            type={ButtonType.submit}
            isDisabled={!isValid}
          >
            Log in
          </Button>

          <Button
            className="form-login__button"
            variant={ButtonVariant.outline}
            size={ButtonSize.medium}
            type={ButtonType.button}
            isNavLink
            path={SCREENS.SCREEN_SIGN_UP}
          >
            Registration
          </Button>
        </Wrapper>
      </form>
    </Wrapper>
  );
});
