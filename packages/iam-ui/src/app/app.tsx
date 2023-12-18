
import styled from 'styled-components';
import GlobalStyle from '../common/styles/GlobalStyle';
import { themeObject } from '../common/styles/themes/themeVariables';
import { useLanguage } from '../common/hooks/useLanguage';
import { useAppSelector } from '../common/hooks/reduxHooks';
import { useThemeWatcher } from '../common/hooks/useThemeWatcher';
import { useAutoNightMode } from '../common/hooks/useAutoNightMode';
import { usePWA } from '../common/hooks/usePWA';
import { HelmetProvider } from 'react-helmet-async';
import { ConfigProvider } from 'antd';
import deDe from 'antd/lib/locale/de_DE';
import enUS from 'antd/lib/locale/en_US';
import { AppRouter } from '../router/AppRouter';


const StyledApp = styled.div`
    // Your style here
`;


export function App() {
  const { language } = useLanguage();
  const theme = useAppSelector((state) => state.theme.theme);

  usePWA();

  useAutoNightMode();

  useThemeWatcher();
  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} />
      <GlobalStyle />
      <HelmetProvider>
        <ConfigProvider locale={language === 'en' ? enUS : deDe}>
          <AppRouter />
        </ConfigProvider>
      </HelmetProvider>
    </>
  );

}


export default App;
