import React from 'react';
import { MoonSunSwitch } from '../../../../../MoonSunSwitch/MoonSunSwitch';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
import { ThemeType } from '../../../../../../utils/interfaces';
import { setNightMode } from '../../../../../../../store/slices/nightModeSlice';
import { setTheme } from '../../../../../../../store/slices/themeSlice';


export const ThemePicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const handleClickButton = (theme: ThemeType) => {
    dispatch(setTheme(theme));
    dispatch(setNightMode(false));
  };

  return (
    <MoonSunSwitch
      isMoonActive={theme === 'dark'}
      onClickMoon={() => handleClickButton('dark')}
      onClickSun={() => handleClickButton('light')}
    />
  );
};
