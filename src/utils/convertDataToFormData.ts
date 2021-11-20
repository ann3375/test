import { SIGN_UP_FIELDS } from './constants';

export const convertDataToFormData = (data: Record<string, string>): FormData => {
  const formData = new FormData();

  formData.append(SIGN_UP_FIELDS.login, data.login);
  formData.append(SIGN_UP_FIELDS.password, data.password);
  formData.append(SIGN_UP_FIELDS.captcha, data.captcha);

  data.passwordConfirm && formData.append(SIGN_UP_FIELDS.passwordConfirm, data.passwordConfirm);
  data.nickname && formData.append(SIGN_UP_FIELDS.nickname, data.nickname);
  data.gender && formData.append(SIGN_UP_FIELDS.gender, data.gender);

  return formData;
};
