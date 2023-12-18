import { useLanguage } from '../common/hooks/useLanguage';
import { AppRoutes } from './app-routes';
import { ConfigProvider, theme } from 'antd';
import deDe from 'antd/lib/locale/de_DE';
import enUS from 'antd/lib/locale/en_US';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyle from '../common/styles/GlobalStyle';
import { themeObject } from '../common/styles/themes/themeVariables';
import { useAppSelector } from '../common/hooks/reduxHooks';

const App = () => {
  const { language } = useLanguage();
  const theme1 = useAppSelector((state) => state.theme.theme);
  return (<>
    <meta name="theme-color" content={themeObject[theme1].primary} />
    <GlobalStyle />
    <HelmetProvider>
      <ConfigProvider
        locale={language === 'en' ? enUS : deDe}
        theme={{
          algorithm: theme.compactAlgorithm,
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 4
          },
        }}
      >
        <AppRoutes />
      </ConfigProvider>
    </HelmetProvider>
  </>
  )
}

export default App
