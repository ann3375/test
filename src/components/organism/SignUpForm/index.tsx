import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootStoreContext } from '../../../store/RootStore';
import { IconName } from '../../atoms/Icon/types/types';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { Wrapper } from '../../atoms/Wrapper';
import { FormSelect } from '../../molecules/FormSelect';
import { Spinner } from '../../molecules/Spinner';
import { ButtonIcon } from '../../molecules/ButtonIcon';
import { CaptchaBlock } from '../../molecules/CaptchaBlock';
import { FormInput } from '../../molecules/FormInput';
import { ButtonSize, ButtonType, ButtonVariant } from '../../atoms/Button/types/types';
import { InputId, InputSize, InputType } from '../../molecules/FormInput/types/types';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { convertDataToFormData } from '../../../utils/convertDataToFormData';
import { defineFieldError } from '../../../utils/defineFieldError';
import { SCREENS } from '../../../router/endpoints';
import { LOADING_STATE } from '../../../store/types/types';

import './signUpForm.scss';

export interface ISignUpFormField {
  login: string;
  password?: string;
  passwordConfirm?: string;
  nickname: string;
  gender: string;
  captcha?: string;
}

const schema = yup.object().shape({
  login: yup
    .string()
    .min(2, 'Your name must contain at least 2 letters')
    .max(50, 'Your name must be less than 50 letters')
    .required('Please input your name'),
  password: yup.string().required('Please input password'),
  passwordConfirm: yup
    .string()
    .required('Please confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  nickname: yup
    .string()
    .min(2, 'Your name must contain at least 2 letters')
    .max(50, 'Your name must be less than 50 letters')
    .required('Please input your name'),
  gender: yup.string().required('Please choose your gender').typeError('Choose your gender'),
  captcha: yup
    .string()
    .min(5, 'Min 5 symbols')
    .max(5, 'Max 5 symbols')
    .required('Please input captcha'),
});

export const SignUpForm = observer(() => {
  const history = useHistory();
  const { genderListStore, userStore } = useContext(RootStoreContext);

  const handleFetchGenderList = useCallback(() => {
    genderListStore.fetchGenderList();
  }, [genderListStore]);

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FieldValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      login: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      gender: '',
      captcha: '',
    },
  });

  const onSubmit: SubmitHandler<ISignUpFormField> = async (formData) => {
    const isRegistrationSuccess = await userStore.sendUserAuthData<boolean>(
      convertDataToFormData(formData),
      '/auth/register'
    );

    isRegistrationSuccess && history.push(SCREENS.SCREEN_LOGIN);
  };

  useEffect(() => {
    if (userStore.userAuthDataError && isSubmitSuccessful) {
      defineFieldError(userStore.userAuthDataError, setError);
    }
  }, [setError, userStore.userAuthDataError, isSubmitSuccessful]);

  return (
    <Wrapper className="form-sign-up">
      <Typography className="form-sign-up__text" variant={TypographyTypeStyle.h2}>
        Registration
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={InputId.login}
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder={'Input user name'}
              type={InputType.text}
              labelText="Create user name"
              className="form-sign-up__input"
              field={field}
              size={InputSize.large}
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
              type={InputType.text}
              labelText="Create password"
              className="form-sign-up__input"
              field={field}
              size={InputSize.large}
              errorText={errors.password?.message}
            />
          )}
        />

        <Controller
          name={InputId.passwordConfirm}
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder={'Password confirmation'}
              type={InputType.text}
              labelText="Password confirmation"
              className="form-sign-up__input"
              field={field}
              size={InputSize.large}
              isAvailableAutoComplete={false}
              errorText={errors.passwordConfirm?.message}
            />
          )}
        />

        <Controller
          name={InputId.nickname}
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder={'Nickname'}
              type={InputType.text}
              labelText="Nickname"
              className="form-sign-up__input"
              field={field}
              size={InputSize.large}
              errorText={errors.nickname?.message}
            />
          )}
        />

        {genderListStore.loadingState === LOADING_STATE.PENDING ? (
          <Spinner />
        ) : genderListStore.genderListFetchError ? (
          <Wrapper flex align="center">
            Failed to fetch gender list. Try again?
            <ButtonIcon
              iconName={IconName.updateIcon}
              type={ButtonType.button}
              onClick={handleFetchGenderList}
              arialabel="Fetch gender list"
            />
          </Wrapper>
        ) : (
          <FormSelect
            options={genderListStore.genderList}
            labelText={'Your gender'}
            className="form-sign-up__input"
            setValue={setValue}
            clearErrors={clearErrors}
            error={errors.gender?.message}
          />
        )}

        <Wrapper flex className="form-sign-up__security-code">
          <Controller
            name={InputId.captcha}
            control={control}
            render={({ field }) => (
              <FormInput
                placeholder={'Security code'}
                type={InputType.text}
                labelText="Security code"
                className="form-sign-up__input"
                field={field}
                isAvailableAutoComplete={false}
                size={InputSize.medium}
                errorText={errors.captcha?.message}
              />
            )}
          />
          <CaptchaBlock />
        </Wrapper>

        <Wrapper flex className="form-sign-up__buttons">
          <Button
            className="form-sign-up__button"
            variant={ButtonVariant.primary}
            size={ButtonSize.medium}
            type={ButtonType.submit}
            isDisabled={!isValid}
          >
            Register
          </Button>

          <Button
            className="form-sign-up__button"
            variant={ButtonVariant.outline}
            size={ButtonSize.medium}
            type={ButtonType.button}
            isNavLink
            path={SCREENS.SCREEN_LOGIN}
          >
            Log In
          </Button>
        </Wrapper>
      </form>
    </Wrapper>
  );
});
