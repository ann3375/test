import { FieldValues, UseFormSetError } from 'react-hook-form';
import { ISignUpFormField } from '../components/organism/SignUpForm';
import { SIGN_UP_FIELDS } from './constants';

export const defineFieldError = (
  errorText: string,
  setError: UseFormSetError<FieldValues | ISignUpFormField>
): void => {
  for (const field in SIGN_UP_FIELDS) {
    errorText.match(SIGN_UP_FIELDS.gender) &&
      setError('gender', { message: 'Something wrong with this field' });

    errorText.match(SIGN_UP_FIELDS.password) &&
      setError('passwordConfirm', { message: 'Something wrong with this field' });

    errorText.match(SIGN_UP_FIELDS.nickname) &&
      setError('nickname', { message: 'Your name must be less than 50 letters' });

    if (errorText.match(field)) {
      setError(field, { message: errorText });
    }
  }
};
