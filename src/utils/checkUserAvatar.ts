import { UserGender } from '../components/atoms/Avatar/types/types';
import { IconName } from '../components/atoms/Icon/types/types';

export const checkUserAvatar = (gender: string | undefined): string => {
  if (gender === UserGender.male) return IconName.maleAvatar;
  if (gender === UserGender.female) return IconName.femaleAvatar;

  return IconName.noUserAvatar;
};
