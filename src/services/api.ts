import { URL_API } from './contants';

export const fetchApi = {
  fetchCaptcha: async (
    setCaptchaURL: (captchaURL: string) => void,
    setIsLoaded: (isLoaded: boolean) => void
  ): Promise<void> => {
    setIsLoaded(false);
    setCaptchaURL('');

    try {
      await fetch(`${URL_API}/auth/captcha?t=${Date.now()}`).then((res) => {
        if (res.status === 200) {
          setCaptchaURL(res.url);
        }
      });
    } catch (e) {
      setCaptchaURL('');
    } finally {
      setIsLoaded(true);
    }
  },
};
